import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    flexWrap: "nowrap",
    rowGap: 20,
    columnGap: 20,
    padding: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
  },
  description: {
    display: "flex",
    flexShrink: 1,
    rowGap: 5,
    alignItems: "flex-start",
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  stat: {
    display: "flex",
    alignItems: "center",
  },
  language: {
    display: "flex",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 3,
  },
  button: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
});

const RepositoryItem = ({ item, displayLink }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.info}>
        <Image
          style={styles.profilePic}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.description}>
          <Text fontWeight={"bold"}>{item.fullName}</Text>
          <Text color={"textSecondary"}>{item.description}</Text>
          <View style={styles.language}>
            <Text color={"textTertiary"}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat name={"Stars"} value={item.stargazersCount} />
        <Stat name={"Forks"} value={item.forksCount} />
        <Stat name={"Reviews"} value={item.reviewCount} />
        <Stat name={"Rating"} value={item.ratingAverage} />
      </View>
      {displayLink ? (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text
            fontSize={"subheading"}
            fontWeight={"bold"}
            color={"textTertiary"}
          >
            Open in GitHub
          </Text>
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};

const Stat = ({ name, value }) => {
  return (
    <View style={styles.stat}>
      <Text fontWeight={"bold"}>
        {value >= 1000 ? Math.floor(value / 100) / 10.0 + "k" : value}
      </Text>
      <Text color={"textSecondary"}>{name}</Text>
    </View>
  );
};

export default RepositoryItem;
