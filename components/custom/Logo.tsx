import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-tr from-red-200 to-cyan-800 text-transparent bg-clip-text"
    >
      Logo
    </Link>
  );
};

export default Logo;
