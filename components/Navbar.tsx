import { Button } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { UserContext } from "@/contexts/userContext";
const Navbar = () => {
  const userCTX = useContext(UserContext);
  console.log("usercontext", userCTX);
  return (
    <div className="h-20 flex items-center px-20 justify-between">
      <Image src={"/logo.png"} alt="logo" width={100} height={32} />
      {userCTX.user && (
        <Button variant="outlined" color="info" onClick={() => signOut(auth)}>
          LOGOUT
        </Button>
      )}
    </div>
  );
};

export default Navbar;
