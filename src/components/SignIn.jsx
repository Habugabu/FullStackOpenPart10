import Text from "./Text";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import useSignIn from "../hooks/useSignIn";

import * as yup from "yup";

import theme from "../theme";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});

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
  invalid: {
    borderColor: theme.colors.error,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputBox,
          formik.touched.username && formik.errors.username
            ? styles.invalid
            : {},
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputBox,
          formik.touched.password && formik.errors.password
            ? styles.invalid
            : {},
        ]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}

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
