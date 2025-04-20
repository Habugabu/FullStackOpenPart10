import useRepoReviews from "../hooks/useRepoReviews";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
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
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

const Repository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const { reviews } = useRepoReviews(id);

  const item = repository ? repository : {};

  if (!item) {
    return <></>;
  }

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <ReviewItem review={item} key={item.id} />
      )}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={item} displayLink />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default Repository;
