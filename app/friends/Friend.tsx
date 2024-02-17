"use client";

import { Box, Button, useDisclosure } from "@chakra-ui/react";
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
      mx={{ base: "5px", lg: "20px" }}
      px={{ base: "5px", lg: "15px" }}
      py='10px'
      boxShadow="md"
      borderRadius="lg"
      border="1px"
      borderColor="gray.100"
      mb="15px"
    >
      <Box>
        <Box fontSize={{ base: "1rem", lg: "1.2rem" }} display='flex' justifyContent='center'>
          <Box as='span' fontWeight={600}>{friend?.friend?.name?.toUpperCase()}</Box>
        </Box>
        <Box fontSize={{ base: "0.8rem", lg: "1rem" }}>
          Email: {friend?.friend?.email}
        </Box>
      </Box>
      <Box
        display="flex"
        gap={{ base: 1, lg: 6 }}
        fontSize={{ base: "1rem", lg: "1.2rem" }}
        justifyContent='center'
        pt='15px'
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
