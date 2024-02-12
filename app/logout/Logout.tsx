import React from "react";
import { auth, signOut } from "@/app/actions/auth";
import { Button } from "@chakra-ui/react";
import { redirect } from "next/navigation";

async function Logout() {

  const handleLogout = async () => {
    "use server";
    await signOut();
    redirect('/'); //not working
  }

  const session = await auth();

  !session?.user && redirect('/') 


  return (
    <form
      action={handleLogout} 
      style={{display: 'flex', justifyContent: 'center'}}
    >
      <Button type="submit">
        Click here to Logout
      </Button>

    </form>
  );
}

export default Logout;
