"use client";

import { editTask } from "@/app/actions/tasks";
import {
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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChangeEvent, FormEvent } from "react";

interface EditTaskModalProps {
  task: {
    id: string;
    content: string;
    userCreatorId: string;
    createdAt: Date;
    updatedAt: Date;
    userIds: string[];
    users: { id: string; name: string | null }[];
  };
  isOpen: boolean;
  onClose: () => void;
}

function EditTaskModal({task, isOpen, onClose}:EditTaskModalProps) {
  const [isLargerThan800] = useMediaQuery('(min-width: 992px)')
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [editedTask, setEditedTask] = useState(task.content);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editedTask === "") {
      return toast({
          title: 'Task must have a content',
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
    }
    setIsLoading(true)

    await editTask(task.id, editedTask);

    setIsLoading(false)
    toast({
      title: 'Task Edited!',
      position: 'top',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    onClose();
  };

  useEffect(() => {
    setEditedTask(task.content)
  }, [task.content, isOpen])

  return (
    <>
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
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
              <FormLabel>New Description</FormLabel>
              <Input
                ref={initialRef}
                onChange={handleChange}
                value={editedTask}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} isLoading={isLoading} loadingText='Editing' onClick={handleSubmit}>
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditTaskModal;
