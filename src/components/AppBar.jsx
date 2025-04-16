import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"} link={"/"} />
      <AppBarTab text={"Sign in"} link={"/login"} />
    </View>
  );
};

export default AppBar;
