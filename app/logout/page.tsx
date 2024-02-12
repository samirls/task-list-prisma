import React from "react";
import Logout from "./Logout";
import { Box } from "@chakra-ui/react";

function page() {
  return (
    <Box
      pb={{ base: "110px", lg: "150px" }}
      pt={{ base: "150px", lg: "170px" }}
      pl={20}
    >
      <Logout />
    </Box>
  );
}

export default page;
