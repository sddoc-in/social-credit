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
import PannelUser from "../../../interface/Paneluser";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";
import UserErrorInterface from "../../../interface/Error";
import DiscordUser from "../../../interface/DiscordUser";
import InputNumber from "../../input/InputNumber";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: DiscordUser;
  panelUser: PannelUser[];
}

export default function UpdateUserPopup(props: Props) {
  const { user: currentUser } = React.useContext(AppContext);
  const [panelUser, setPanelUser] = React.useState({
    username: props.data.username,
    lower_points: 0,
  });

  const [approver, setApprover] = React.useState<string>("" as string);
  const [approverEnabled, setApproverEnabled] = React.useState<boolean>(false);

  const [error, setError] = React.useState<UserErrorInterface>(
    {} as UserErrorInterface
  );

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
        .put(API_URL + "/discord/update?" + params, {
          userId: props.data.userId,
          username: panelUser.username,
          lower_points: panelUser.lower_points,
          approver_id: approver,
        })
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });
      if (
        data.message !== "Request Send Successfully." &&
        data.message !== "User Updated successfully."
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

    if (e.target.name === "lower_points") {
      if (Math.abs(parseInt(e.target.value)) >= 10) {
        setApproverEnabled(true);
      }
      else {
        setApproverEnabled(false);
      } 
    }
  }

  function onApproverChange(type: string, value: string) {
    setApprover(value);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Points</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputName
              name="name"
              defValue={panelUser.username}
              disabled={true}
              placeholder="Name"
              inputClassName="w-full"
              onChangeHandler={onChange}
              error={
                error.hasError && error.field === "name" ? error.message : ""
              }
            />
            <InputNumber
              name="lower_points"
              defValue={0}
              placeholder="Lower Points"
              inputClassName="w-full"
              onChangeHandler={onChange}
              error={
                error.hasError && error.field === "lower_points"
                  ? error.message
                  : ""
              }
            />

            {(currentUser.role !== "supreme_leader"  || approverEnabled) && (
              <InputSelect
                name="approver_id"
                selectArray={props.panelUser.map((user) => {
                  return {
                    value: user.uid,
                    name: user.name,
                    id: user.uid,
                  };
                })}
                onChange={onApproverChange}
                defValue=""
                placeholder="Select your approver"
                inputClassName="w-full my-3"
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
