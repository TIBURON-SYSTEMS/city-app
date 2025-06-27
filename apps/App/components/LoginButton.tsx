import { useAuth0 } from "react-native-auth0";
import { Button, ButtonText } from "./ui/button";

export default function LoginButton() {
  const { authorize } = useAuth0();

  const onPress = async () => {
    // const redirectUrl = AuthSession.makeRedirectUri({
    //   scheme: "com.anonymous.App.auth0",
    //   path: "dev-xdrciyamtkwtk3qm.eu.auth0.com/ios/com.anonymous.app/callback",
    // });
    // console.log("Redirect URI:", redirectUrl);

    try {
      await authorize({
        // redirectUrl,
      });
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  return (
    <Button onPress={onPress}>
      <ButtonText>Login</ButtonText>
    </Button>
  );
}
