import Logo from "@/components/custom/Logo";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="h-15 flex justify-between border-b border-border px-4 py-2 items-center">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{props.children}</main>
    </div>
  );
};

export default Layout;
