import React from "react";
import Link from "next/link";
import Image from "next/image";

import BitpackLogo from "../../public/bitpack.png";

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="top-0 flex w-full flex-row items-center justify-between bg-[#ECEEF4] py-2 px-4">
      <Link
        className="text-[2rem] font-extrabold italic tracking-wide"
        href="/"
      >
        <Image src={BitpackLogo} alt="Bitpack Text Logo" height={50} />
      </Link>
      <div className="flex flex-row items-center space-x-4 text-lg font-medium">
        <Link href={"/meroku-server"}>Backend APIs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
