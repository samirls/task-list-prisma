"use client";

import { Box, Button, Grid, useDisclosure } from "@chakra-ui/react";
import React from "react";
import DeleteFriendModal from "./modals/DeleteFriendModal";

interface FriendProps {
  friend: {
    id: string;
    userId: string;
    friendId: string;
    friend: { id: string | null; name: string | null; email: string | null };
  };
}

function Friend({ friend }: FriendProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mx={{ base: "10px", lg: "100px" }}
      px={{ base: "5px", lg: "15px" }}
      py='10px'
      boxShadow="md"
      borderRadius="lg"
      border="1px"
      borderColor="gray.100"
      mb="15px"
    >
      <Box>
        <Box fontSize={{ base: "1rem", lg: "1.2rem" }}>
          {friend?.friend?.name?.toUpperCase()}
        </Box>
        <Box fontSize={{ base: "0.8rem", lg: "1rem" }}>
          Id: {friend?.friend?.id}
        </Box>
        <Box fontSize={{ base: "0.8rem", lg: "1rem" }}>
          Email: {friend?.friend?.email}
        </Box>
      </Box>
      <Box
        display="flex"
        gap={{ base: 1, lg: 6 }}
        fontSize={{ base: "1rem", lg: "1.2rem" }}
      >
        <Button colorScheme="red" onClick={onOpen} size="sm">
          Delete
        </Button>
        <DeleteFriendModal isOpen={isOpen} onClose={onClose} friend={friend} />
      </Box>
    </Box>
  );
}

export default Friend;
