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
  useToast,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { shareTask } from "@/app/actions/tasks";
import { ChangeEvent } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface ShareTaskModalProps {
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
  friends: Friend[];
  sharedUsers: { id: string | null; name: string | null };
}

interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friend: { id: string | null; name: string | null };
}

function ShareTaskModal({
  task,
  friends,
  isOpen,
  onClose,
  sharedUsers,
}: ShareTaskModalProps) {
  const [isLargerThan800] = useMediaQuery("(min-width: 992px)");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<any>(sharedUsers);
  const toast = useToast();

  const selectSingleFriend = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFriend = friends.find(
      (item) => item.friend.id === event.target.value
    )?.friend;

    if (
      selectedFriend &&
      !selectedFriends.some((item) => item.id === event.target.value)
    ) {
      setSelectedFriends([...selectedFriends, selectedFriend]);
    }
  };

  const removeSingleFriend = (id: string) => {
    const updatedFriends = selectedFriends.filter(
      (item) => item.id !== id
    );
    setSelectedFriends(updatedFriends);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const selectedUserIds = selectedFriends.map((item) => item.id);

      console.log(selectedUserIds)

      await shareTask(task.id, selectedUserIds);

      toast({
        title: "Task shared successfully",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error("Error sharing task:", error);
      toast({
        title: "Error sharing task",
        description: `${error}`,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedFriends(sharedUsers);
    }
  }, [isOpen, sharedUsers]);


  return (
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
        <ModalHeader>Share this task with a friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {friends.length === 0 ? (
            <Box fontSize="1.2rem">
              <Box>You need to add a friend first.</Box>
              <Box>
                Add a friend <Link href="/friends">clicking here.</Link>
              </Box>
            </Box>
          ) : (
            <Box fontSize="1.2rem">
              <Select
                placeholder="Select a friend"
                onChange={selectSingleFriend}
              >
                {friends.map((item, index) => (
                  <option key={index} value={item.friend.id!}>
                    {item?.friend?.name?.toUpperCase()}, Id: {item?.friend?.id}
                  </option>
                ))}
              </Select>
              <Box>
                {selectedFriends?.map((item, index) => (
                  <Box key={index} pt="10px">
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>{item?.name?.toUpperCase()}</TagLabel>
                      <TagCloseButton
                        onClick={() => removeSingleFriend(item.id!)}
                      />
                    </Tag>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            isLoading={isLoading}
            loadingText="Submitting"
            onClick={handleSubmit}
          >
            Save and Share
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ShareTaskModal;
