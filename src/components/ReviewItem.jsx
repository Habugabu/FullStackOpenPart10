import { View, StyleSheet } from "react-native";
import Text from "./Text";

import { format } from "date-fns";

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
  reviewScore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewScoreText: {
    color: theme.colors.primary,
    fontSize: 20,
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.reviewScore}>
          <Text style={styles.reviewScoreText} fontWeight={"bold"}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.description}>
          <Text fontSize={"subheading"} fontWeight={"bold"}>
            {review.user.username}
          </Text>
          <Text color={"textSecondary"}>
            {format(review.createdAt, "yyyy-MM-dd")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
