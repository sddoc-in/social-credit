import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, ModalCloseButton } from "@chakra-ui/react";
import { AppContext } from "../../../context/Context";
import axios from "axios";
import { API_URL } from "../../../constants/data";
import getAllWhiteLitedInterface from "../../../interface/getAllWhiteLited";

interface Props {
  data: getAllWhiteLitedInterface;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteWhitelistedPopup(props: Props) {
  const { user: currentUser, theme } = React.useContext(AppContext);

  const boxTheme = theme === "light" ? "bg-transparent" : "bg-[#002F53!important] text-[white!important]";

  const onDelete = async () => {
    try {
      const params = new URLSearchParams({
        access_token: currentUser.access_token,
        session: currentUser.session,
        uuid:props.data.uuid,
      });

      const response = await axios.delete(`${API_URL}/whiteListed/delete?${params.toString()}`);

      const data = response.data;

      if (data.message !== "WhiteListed deleted successfully") {
        alert(data.message);
        return;
      }
      
      props.onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the white-listed user.");
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent className={boxTheme}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Are you sure you want to delete this user?</p>
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={onDelete}
            className="bg-[#002F53] text-[white!important] capitalize hover:bg-[#002F53!important]"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
