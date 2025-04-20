import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onOrderChange }) => {
  const [selectedOrder, setSelectedOrder] = useState("latest");

  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <Pressable onPress={() => handleNavigate(item.id)}>
          <RepositoryItem item={item} key={item.id} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <View>
          <Picker
            selectedValue={selectedOrder}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedOrder(itemValue);
              onOrderChange(itemValue);
            }}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="high" />
            <Picker.Item label="Lowest rated repositories" value="low" />
          </Picker>
        </View>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });

  const handleOrderChange = (newOrder) => {
    console.log(newOrder);
    switch (newOrder) {
      case "latest":
        setOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case "high":
        setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
        break;
      case "low":
        setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
    }
  };

  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onOrderChange={handleOrderChange}
    />
  );
};

export default RepositoryList;
