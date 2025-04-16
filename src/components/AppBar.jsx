import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
  },
  scroll: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
    padding: 20,
    columnGap: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab text={"Repositories"} link={"/"} />
        <AppBarTab text={"Sign in"} link={"/login"} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
