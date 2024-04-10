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
  approverData: PannelUser[];
}

export default function CreatePhrase(props: Props) {
  const { user: currentUser } = React.useContext(AppContext);
  const [panelUser, setPanelUser] = React.useState<Phrases>({} as Phrases);
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
        .post(API_URL + "/phrase/create?" + params, {
          phrase: panelUser.phrase,
          points: panelUser.points,
          approver: approver,
        })
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });
      if (
        data.message !== "Approval Send successfully." &&
        data.message !== "Phrase created successfully."
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
              defValue=""
              placeholder="Name"
              inputClassName="w-full"
              onChangeHandler={onChange}
            />

            <InputNumber
              name="points"
              defValue={0}
              placeholder="Points"
              inputClassName="w-[96%] mx-auto"
              onChangeHandler={onChange}
            />

            {currentUser.role !== "supreme_leader" && (
              <InputSelect
                name="approver_id"
                selectArray={props.approverData.map((user) => {
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
                : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
