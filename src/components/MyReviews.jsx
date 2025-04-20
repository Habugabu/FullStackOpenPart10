import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";
import useCurrentUser from "../hooks/useCurrentUser";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const user = useCurrentUser(true);

  if (!user) {
    return <></>;
  }

  const reviewNodes = user.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <ReviewItem review={item} key={item.id} />
      )}
    />
  );
};

export default MyReviews;
