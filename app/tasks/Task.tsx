"use client";

import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import ShareTaskModal from "./modals/ShareTaskModal";
import { Item } from "@radix-ui/react-select";

interface TaskProps {
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
  friends: {
    id: string;
    userId: string;
    friendId: string;
    friend: { id: string | null; name: string | null };
  }[];
}

function Task({ task, friends }: TaskProps) {
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onClose: onShareModalClose,
  } = useDisclosure();

  const sharedUsers = task.users.filter(
    (user) => user.id !== task.userCreatorId
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mx={{ base: "10px", lg: "100px" }}
      px={{ base: "5px", lg: "15px" }}
      boxShadow="md"
      borderRadius="lg"
      border="1px"
      borderColor="gray.100"
      mb="15px"
    >
      <Box>
      <Box fontSize={{ base: "1.1rem", lg: "1.3rem" }} py='5px' fontWeight={700}>{task.title.toLocaleUpperCase()}</Box>
        <Box fontSize={{ base: "1rem", lg: "1.2rem" }}>{task.content}</Box>
        <Box fontSize={{ base: "0.7rem", lg: "1rem" }} color="gray.400">
          Created by user{" "}
          <Box as="span" fontWeight={600}>
            {task?.users[0].name?.toUpperCase()}.
          </Box>{" "}
          {task.userIds.length === 1 ? (
            "Not shared"
          ) : (
            <>
              Shared to:{" "}
              <Box as="span" fontWeight={600}>
                {sharedUsers.map((item, index) => (
                  <Box as="span" key={index}>
                    {item.name?.toUpperCase()}
                    {index === sharedUsers.length - 1 ? "." : ","}
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        gap={{ base: 1, lg: 6 }}
        fontSize={{ base: "1rem", lg: "1.2rem" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Button colorScheme="teal" onClick={onShareModalOpen} size="sm">
          Shares
        </Button>
        <ShareTaskModal
          isOpen={isShareModalOpen}
          onClose={onShareModalClose}
          task={task}
          friends={friends}
          sharedUsers={sharedUsers}
        />
        <Button colorScheme="purple" onClick={onEditModalOpen} size="sm">
          Content
        </Button>
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          task={task}
        />
        <Button colorScheme="red" onClick={onDeleteModalOpen} size="sm">
          Delete
        </Button>
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          task={task}
        />
      </Box>
    </Box>
  );
}

export default Task;
