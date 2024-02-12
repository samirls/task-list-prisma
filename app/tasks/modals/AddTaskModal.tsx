"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { createTask } from "@/app/actions/tasks";
import { ChangeEvent, FormEvent } from "react";
import { useMediaQuery } from '@chakra-ui/react'

interface AddTaskModalProps {
  user_id: string | undefined | null;
}

function AddTaskModal({user_id}:AddTaskModalProps) {

  const [isLargerThan800] = useMediaQuery('(min-width: 992px)')
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [task, setTask] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  console.log(user_id)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (task === "") {
      return toast({
        title: "Task must have a description",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(true);
    await createTask(task!, user_id!);
    setIsLoading(false);
    setTask("");
    toast({
      title: "Task Added!",
      position: "top",
      description: "Add another one.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box>
      <Button
        leftIcon={<IoMdAddCircle />}
        colorScheme="green"
        variant="solid"
        onClick={onOpen}
      >
        New Task
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isLargerThan800 ? 'xl' : 'xs'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Need to buy some fruits for breakfast"
                onChange={handleChange}
                value={task}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              isLoading={isLoading}
              loadingText="Submitting"
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddTaskModal;
