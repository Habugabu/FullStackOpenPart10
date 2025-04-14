import { View } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>
        Full name: {item.fullName} {"\n"}
        Description: {item.description} {"\n"}
        Language: {item.language} {"\n"}
        Forks: {item.forksCount} {"\n"}
        Stars: {item.stargazersCount} {"\n"}
        Rating: {item.ratingAverage} {"\n"}
        Reviews: {item.reviewCount} {"\n"}
      </Text>
    </View>
  );
};

export default RepositoryItem;
