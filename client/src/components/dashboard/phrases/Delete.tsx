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
import PannelUser from "../../../interface/Paneluser";
import { AppContext } from "../../../context/Context";
import InputSelect from "../../input/InputSelect";
import Phrases from "../../../interface/Phrases";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Phrases;
  onDelete: (data: any) => void;
  approverData: PannelUser[];
  type: string;
  setApprover: (name: string, value: string) => void;
}

export default function Delete(props: Props) {
  const { user: currentUser,theme } = React.useContext(AppContext);

  let boxTheme =
    theme === "light"
      ? "bg-transparent "
      : "bg-[#002F53!important] text-[white!important]";


  function onDelete() {
    props.onDelete(props.data);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent className={boxTheme}>
          <ModalHeader>Delete Phrase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Do you want to delete this Phrase -{" "}
              {props.data.phrase}
              ?{" "}
            </p>

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
                onChange={props.setApprover}
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
            <Button variant="ghost" onClick={onDelete} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
