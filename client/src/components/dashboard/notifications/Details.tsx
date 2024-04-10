import React from "react";
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
import InputName from "../../input/InputName";
import InputNumber from "../../input/InputNumber";

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: string;
}

export default function Details(props: DetailsProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificqtion Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.type === "phrase-create" ||
            props.type === "phrase-update" ||
            props.type === "phrase-delete" ? (
              <PhraseCreate {...props.data} />
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function PhraseCreate(phrase: { phrase: string; points: number}) {
  return (
    <>
      <InputName
        name="phrase"
        defValue={phrase.phrase}
        disabled={true}
        placeholder="Name"
        inputClassName="w-full"
      />

      <InputNumber
        name="points"
        defValue={phrase.points}
        placeholder="Points"
        inputClassName="w-[96%] mx-auto"
      />
    </>
  );
}
