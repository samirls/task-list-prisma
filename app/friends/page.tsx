import {
  Box,
} from "@chakra-ui/react";
import React from "react";
import AddFriendModal from './modals/AddFriendModal'
import { GiCardboardBox } from "react-icons/gi";
import Friend from "./Friend";
import { fetchFriends } from "@/app/actions/friends";
import { auth, getUser } from "@/app/actions/auth";

async function Friends() {

  const session = await auth();
  const userEmail = session?.user?.email;

  let allUserData:any;

  if (userEmail) {
    allUserData = await getUser(userEmail);
    console.log(allUserData);
  } else {
    console.log("Email não está definido na sessão.");
  }

  const fetchedFriends = await fetchFriends(allUserData?.id);

  return (
    <Box
      pb={{ base: "110px", lg: "150px" }}
      pt={{ base: "150px", lg: "170px" }}
    >
      <Box
        fontSize="2rem"
        fontWeight="500"
        display="flex"
        justifyContent="center"
      >
        Friends
      </Box>
      <Box
        fontSize="1.5rem"
        fontWeight="400"
        display="flex"
        pl='20px'
      >
        Hello {allUserData?.name.toUpperCase()}, your Id is: {allUserData?.user_id}
      </Box>
      <Box pl={{ base: "10px", lg: "100px" }} py="10px">
        <AddFriendModal userId={allUserData?.id}/>
      </Box>
      <Box>
        {fetchedFriends.map((friend, index) => (
          <Friend key={index} friend={friend} />
        ))}
        {fetchedFriends.length === 0 && (
          <Box display='flex' justifyContent='center' alignItems='center' flexDir='column' height='400px'>
            <Box fontSize="4rem">
              <GiCardboardBox />
            </Box>
            <Box>You have no friends yet, add one!</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Friends;
