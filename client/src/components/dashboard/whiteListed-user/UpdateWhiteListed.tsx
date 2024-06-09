import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, ModalCloseButton } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";
import getAllWhiteLitedInterface from "../../../interface/getAllWhiteLited";
import InputName from "../../input/InputName"; // assuming you have a reusable InputName component
import InputSelect from "../../input/InputSelect"; // assuming you have a reusable InputSelect component
import UserErrorInterface from "../../../interface/Error"; // assuming similar error interface
import validateUser from "../../../functions/validateUserSignup"; // assuming similar validation function

interface Props {
  data: getAllWhiteLitedInterface;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateWhitelistedPopup(props: Props) {
  const { user: currentUser, theme } = React.useContext(AppContext);
  const [whiteListed, setWhiteListed] = React.useState<getAllWhiteLitedInterface>(props.data);
  const [error, setError] = React.useState<Partial<UserErrorInterface>>({});

  const boxTheme = theme === "light" ? "bg-transparent" : "bg-[#002F53!important] text-[white!important]";

  const onCreate = async () => {
    if (validate()) {
      return;
    }
    if (currentUser.role !== "supreme_leader" && currentUser.uuid !== whiteListed.uuid) {
      alert("You are not allowed to update this white-listed user");
      return;
    }

    try {
      const params = new URLSearchParams({
        uuid: currentUser.uuid,
        access_token: currentUser.access_token,
        session: currentUser.session,
      });

      const response = await axios.put(`${API_URL}/whiteListed/update?${params}`, whiteListed);
      const data = response.data;

      if (data.message !== "WhiteListed updated successfully") {
        alert(data.message);
        return;
      }

      alert("WhiteListed updated successfully");
      props.onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the white-listed user.");
    }
  };

  const validate = () => {
    const error: UserErrorInterface = validateUser(whiteListed, "", false);
    if (error.hasError) {
      setError(error);
      return false;
    }
    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhiteListed({
      ...whiteListed,
      [e.target.name]: e.target.value,
    });
  };

  const onRoleChange = (name: string, value: string) => {
    setWhiteListed({
      ...whiteListed,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent className={boxTheme}>
        <ModalHeader>Update White-Listed User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputName
            name="username"
            defValue={whiteListed.username}
            placeholder="Username"
            inputClassName="w-full"
            onChangeHandler={onChange}
            error={error.hasError && error.field === "username" ? error.message : ""}
          />
          <InputSelect
            name="role"
            selectArray={[
              { id: "1", name: "admin", value: "admin" },
              { id: "2", name: "whiteListed", value: "whiteListed" },
            ]}
            onChange={onRoleChange}
            defValue={whiteListed.role}
            placeholder="Select Role"
            inputClassName="w-full"
            error={error.hasError && error.field === "role" ? error.message : ""}
          />
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={onCreate}
            className="bg-[#002F53] text-[white!important] capitalize hover:bg-[#002F53!important]"
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
