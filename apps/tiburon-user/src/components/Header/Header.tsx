import { PageContent } from "@/types/nav";
import Logo from "./Logo";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton";

interface HeaderProps {
  status: PageContent;
}

export default function Header({ status }: HeaderProps) {
  const { user, isAuthenticated } = useAuth0();

  return (
    status !== PageContent.CAMERA && (
      <header className="flex justify-between px-5 pt-5 bg-white">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {status === PageContent.CHALLENGES && "Challenges"}
            {/* {status === PageContent.CAMERA && "Camera"} */}
            {status === PageContent.MAP && "Map"}
            {status === PageContent.PROFILE && "Profile"}
          </h1>
        </div>

        <div className="flex flex-col justify-center">
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && (
            <div className="flex flex-col items-end gap-1">
              <p>
                Welcome back, <b>{user?.name}</b>
              </p>
              {/* <LogoutButton /> */}
            </div>
          )}
        </div>
      </header>
    )
  );
}
