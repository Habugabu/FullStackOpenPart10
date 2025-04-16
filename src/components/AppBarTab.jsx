import { Pressable, View } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

import theme from "../theme";

const AppBarTab = ({ text, link }) => {
  return (
    <View>
      <Pressable>
        <Link to={link}>
          <Text fontSize={"appBar"} color={"textAppBar"}>
            {text}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
