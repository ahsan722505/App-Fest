import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-20 flex items-center pl-20">
      <Image src={"/logo.png"} alt="logo" width={100} height={32} />
    </div>
  );
};

export default Navbar;
