import React from "react";
import { fetchTasks } from "@/app/actions/tasks";
import { fetchFriends } from "@/app/actions/friends";
import Task from "./Task";
import AddTaskModal from "./modals/AddTaskModal";
import { GiCardboardBox } from "react-icons/gi";
import { auth, getUser } from "@/app/actions/auth";
import { Box } from "@chakra-ui/react";

async function Tasks() {

  const session = await auth();
  const userEmail = session?.user?.email;

  let allUserData;

  if (userEmail) {
    allUserData = await getUser(userEmail);
  } else {
    console.log("Email não está definido na sessão.");
  }

  const fetchedTasks = await fetchTasks(allUserData?.id || '');

  ////////////////////////////////////////////////////////////////////////

  const friends = await fetchFriends(allUserData?.id);
  console.log(friends)


  return (
    <Box pb={{ base: "110px", lg: "150px" }} pt={{ base: "150px", lg: "170px" }}>
      <Box
        fontSize="2rem"
        fontWeight="500"
        display="flex"
        justifyContent="center"
      >
        Tasks
      </Box>
      <Box
        fontSize="1.5rem"
        fontWeight="400"
        display="flex"
        pl='20px'
      >
        Hello {allUserData?.name?.toUpperCase()}, your Id is: {allUserData?.id}
      </Box>
      <Box pl={{ base: "10px", lg: "100px" }} py="10px">
        <AddTaskModal user_id={allUserData?.id}/>
      </Box>
      <Box>
        {fetchedTasks?.map((task) => (
          <Task key={task.id} task={task} friends={friends}/>
        ))}
        {fetchedTasks?.length === 0 && (
          <Box display='flex' justifyContent='center' alignItems='center' flexDir='column' height='400px'>
            <Box fontSize="4rem">
              <GiCardboardBox />
            </Box>
            <Box>Empty</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Tasks;
