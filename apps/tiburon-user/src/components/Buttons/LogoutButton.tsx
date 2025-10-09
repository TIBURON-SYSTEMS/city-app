import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="border-2 border-black text-black bg-white px-5 py-1 rounded-md hover:bg-black hover:text-white transition-colors"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <b>Log Out</b>
    </button>
  );
};

export default LogoutButton;
