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
import { Roles } from "../../../constants/Roles";
import InputEmail from "../../input/InputEmail";
import InputName from "../../input/InputName";
import PannelUser from "../../../interface/Paneluser";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";
import UserErrorInterface from "../../../interface/Error";
import validateUser from "../../../functions/validateUserSignup";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: PannelUser;
}

export default function UpdateUserPopup(props: Props) {
  const { user: currentUser } = React.useContext(AppContext);
  const [panelUser, setPanelUser] = React.useState<PannelUser>(props.data);

  const [error, setError] = React.useState<UserErrorInterface>(
    {} as UserErrorInterface
  );

  async function onCreate() {
    if (!ValidateUser()) {
      return;
    }
    if (
      currentUser.role !== "supreme_leader" &&
      currentUser.uid !== props.data.uid
    ) {
      alert("You are not allowed to update this panel user");
      return;
    }

    try {
      const params = new URLSearchParams({
        uid: currentUser.uid,
        access_token: currentUser.access_token,
        session: currentUser.session,
      });

      const data = await axios
        .put(API_URL + "/panel-user/update?" + params, panelUser)
        .then((res) => res.data)
        .catch((err) => {
          let data = err.response.data;
          alert(data.message);
          return;
        });
      if (data.message !== "PannelUser updated successfully") {
        alert(data.message);
        return;
      }
      alert("Panel User updated successfully");
      props.onClose();
      window.location.reload();
    } catch (err) {}
  }

  function ValidateUser() {
    let error: UserErrorInterface = validateUser(panelUser, "", false);
    if (error.hasError) {
      setError(error);
      return false;
    }
    return true;
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPanelUser({
      ...panelUser,
      [e.target.name]: e.target.value,
    });
  }

  function onRoleChange(name: string, value: string) {
    setPanelUser({
      ...panelUser,
      [name]: value,
    });
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
              name="name"
              defValue={panelUser.name}
              placeholder="Name"
              inputClassName="w-full"
              onChangeHandler={onChange}
              error={
                error.hasError && error.field === "name" ? error.message : ""
              }
            />
            <InputName
              name="username"
              defValue={panelUser.username}
              placeholder="Username"
              inputClassName="w-full"
              onChangeHandler={onChange}
              error={
                error.hasError && error.field === "username"
                  ? error.message
                  : ""
              }
            />
            <InputEmail
              name="email"
              defValue={panelUser.email}
              placeholder="Email"
              inputClassName="w-full"
              onChangeHandler={onChange}
              error={
                error.hasError && error.field === "email" ? error.message : ""
              }
            />
            <InputSelect
              name="role"
              selectArray={Roles}
              onChange={onRoleChange}
              defValue={panelUser.role}
              placeholder="Select your role"
              inputClassName="w-full"
              error={
                error.hasError && error.field === "role" ? error.message : ""
              }
            />
            <InputSelect
              name="status"
              selectArray={[
                { name: "active", value: "active", id: "1" },
                { name: "inactive", value: "inactive", id: "2" },
              ]}
              onChange={onRoleChange}
              defValue={panelUser.status}
              placeholder="Select your status"
              inputClassName="w-full"
              error={
                error.hasError && error.field === "status" ? error.message : ""
              }
            />
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
