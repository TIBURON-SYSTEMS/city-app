import { useAuth0 } from "react-native-auth0";
import { Button } from "./ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LogoutButton() {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button onPress={onPress} variant="link">
      <AntDesign name="logout" size={24} color="black" />
    </Button>
  );
}
