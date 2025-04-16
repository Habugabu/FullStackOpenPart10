import Text from "./Text";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    alignContent: "center",
    padding: 10,
    rowGap: 10,
  },
  inputBox: {
    padding: 10,
    display: "flex",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
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

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit} />;
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />

      <TextInput
        style={styles.inputBox}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textTertiary"}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
