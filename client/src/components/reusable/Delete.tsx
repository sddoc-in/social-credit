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
import toTitleCase from "../../functions/toTitle";
import { AppContext } from "../../context/Context";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onDelete: (data: any) => void;
  type: string;
}

export default function Delete(props: Props) {
  const { theme } = React.useContext(AppContext);
  let boxTheme =
    theme === "light"
      ? "bg-transparent "
      : "bg-[#002F53!important] text-[white!important]";

  function onDelete() {
    props.onClose();
    props.onDelete(props.data);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent className={boxTheme}>
          <ModalHeader>Delete {toTitleCase(props.type)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Do you want to delete this {toTitleCase(props.type)} -{" "}
              {props.type === "phrase"
                ? props.data.phrase
                : props.type === "discord-user"
                ? props.data.username
                : props.type === "panel-user"
                ? props.data.name
                : ""}
              ?{" "}
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onDelete} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
