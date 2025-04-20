import { Pressable, View } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ text, link, onPress }) => {
  const stylizedText = (
    <Text fontSize={"subheading"} color={"textTertiary"} fontWeight={"bold"}>
      {text}
    </Text>
  );

  return (
    <View>
      <Pressable onPress={onPress}>
        {link ? <Link to={link}>{stylizedText}</Link> : stylizedText}
      </Pressable>
    </View>
  );
};

export default AppBarTab;
