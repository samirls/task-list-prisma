"use client";

import {
  Box,
  Button,
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
import { deleteFriend } from "@/app/actions/friends";

interface FriendProps {
  isOpen: boolean;
  onClose: () => void;
  friend: friendsFound;
}

interface friendsFound {
  id: string;
  userId: string;
  friendId: string;
  friend: {id: string | null, name: string | null}
}

function DeleteFriendModal({isOpen, onClose, friend}:FriendProps) {
  const [isLargerThan800] = useMediaQuery('(min-width: 992px)')
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDeleteTask = async () => {
    setIsLoading(true)
    await deleteFriend(friend.userId!, friend.friend.id!);
    setIsLoading(false)
    toast({
      title: 'Friend Deleted!',
      position: 'top',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  };

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
          <ModalHeader>Delete Friend</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              Are you sure to delete {friend?.friend?.name?.toUpperCase()} from your friends?
            </Box>
            <Box>
              Note: it will not remove him from the assigned tasks.
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} isLoading={isLoading} loadingText='Deleting' onClick={handleDeleteTask}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteFriendModal;
