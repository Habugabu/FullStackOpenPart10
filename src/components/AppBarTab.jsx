import { Pressable, View } from "react-native";
import Text from "./Text";

import theme from "../theme";

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Pressable>
        <Text fontSize={"appBar"} color={"textAppBar"}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
