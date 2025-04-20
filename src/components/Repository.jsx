import useRepoReviews from "../hooks/useRepoReviews";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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
