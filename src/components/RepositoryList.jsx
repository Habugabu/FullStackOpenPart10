import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  inputBox: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    display: "flex",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onOrderChange,
  onFilterChange,
}) => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <>
      <TextInput
        style={styles.inputBox}
        placeholder="Search repositories..."
        value={filter}
        onChangeText={handleFilterChange}
      />
      <FlatList
        nestedScrollEnabled
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
    </>
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);

  const handleOrderChange = (newOrder) => {
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const { repositories } = useRepositories(order, debouncedFilter);

  return (
    <RepositoryListContainer
      repositories={repositories}
      onOrderChange={handleOrderChange}
      onFilterChange={handleFilterChange}
    />
  );
};

export default RepositoryList;
