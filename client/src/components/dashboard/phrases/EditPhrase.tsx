import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import InputSelect from "../../input/InputSelect";
import InputName from "../../input/InputName";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";
import Phrases from "../../../interface/Phrases";
import InputNumber from "../../input/InputNumber";
import PannelUser from "../../../interface/Paneluser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Phrases;
  approver: PannelUser[];
}

export default function EditPhrase(props: Props) {
  const { user: currentUser } = React.useContext(AppContext);
  const [panelUser, setPanelUser] = React.useState<Phrases>(props.data);
  const [approver, setApprover] = React.useState<string>("");

  async function onCreate() {
    if (!currentUser.uid) {
      return;
    }
    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        access_token: currentUser.access_token,
        session: currentUser.session,
      });

      const data = await axios
        .put(API_URL + "/phrase/update?" + params, {
          phrase_id: props.data.phrase_id,
          phrase: props.data.phrase,
          approver: approver,
          points: panelUser.points,
        })
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });
      if (
        data.message !== "Request Send Successfully." &&
        data.message !== "Phrase Updated successfully."
      ) {
        alert(data.message);
        return;
      }
      alert(data.message);
      props.onClose();
      window.location.reload();
    } catch (err) {}
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPanelUser({
      ...panelUser,
      [e.target.name]: e.target.value,
    });
  }

  function onRoleChange(name: string, value: string) {
    setApprover(value);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Panel User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputName
              name="phrase"
              defValue={panelUser.phrase}
              disabled={true}
              placeholder="Name"
              inputClassName="w-full"
              onChangeHandler={onChange}
            />

            <InputNumber
              name="points"
              defValue={panelUser.points}
              placeholder="Points"
              inputClassName="w-[96%] mx-auto"
              onChangeHandler={onChange}
            />

            {currentUser.role !== "supreme_leader" && (
              <InputSelect
                name="approver_id"
                selectArray={props.approver.map((user) => {
                  return {
                    value: user.uid,
                    name: user.name,
                    id: user.uid,
                  };
                })}
                onChange={onRoleChange}
                defValue=""
                placeholder="Select your approver"
                inputClassName="w-full"
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={onCreate}
              className="bg-[#002F53] text-[white!important] capitalize hover:bg-[#002F53!important] "
            >
              {currentUser.role !== "supreme_leader"
                ? "Send Approval"
                : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
