import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";

import useSignOut from "../hooks/useSignOut";
import useCurrentUser from "../hooks/useCurrentUser";

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
  const username = useCurrentUser(false);
  const [signOut] = useSignOut();
  const handleSignOut = async (event) => {
    event.preventDefault();
    await signOut();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab text={"Repositories"} link={"/"} />
        {!username ? (
          <>
            <AppBarTab text={"Sign in"} link={"/login"} />
            <AppBarTab text={"Sign up"} link={"/signup"} />
          </>
        ) : (
          <>
            <AppBarTab text={"Create review"} link={"/review"} />
            <AppBarTab text={"My reviews"} link={"/myreviews"} />
            <AppBarTab text={"Sign out"} onPress={handleSignOut} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
