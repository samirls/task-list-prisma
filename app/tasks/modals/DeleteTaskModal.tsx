"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
import React, { useState } from "react";
import { deleteTask } from "@/app/actions/tasks";

interface DeleteTaskModalProps {
  task: {
    id: string;
    title: string;
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

function DeleteTaskModal({ task, isOpen, onClose }: DeleteTaskModalProps) {
  const [isLargerThan800] = useMediaQuery("(min-width: 992px)");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDeleteTask = async () => {
    setIsLoading(true);
    await deleteTask(task.id);
    setIsLoading(false);
    toast({
      title: "Task Deleted!",
      position: "top",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isLargerThan800 ? "xl" : "xs"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this Task?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Title:{" "}
                <Box as="span" fontWeight={700}>
                  {task.title}
                </Box>
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              isLoading={isLoading}
              loadingText="Deleting"
              onClick={handleDeleteTask}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteTaskModal;
