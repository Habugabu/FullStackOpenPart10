import Text from "./Text";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";

import * as yup from "yup";

import theme from "../theme";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username required")
    .min(5, "Must be between 5 and 30 characters")
    .max(30, "Must be between 5 and 30 characters"),
  password: yup
    .string()
    .required("Password required")
    .min(5, "Must be between 5 and 30 characters")
    .max(30, "Must be between 5 and 30 characters"),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref("password"), null], "Must match password")
    .required("Password confirmation required"),
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
  passwordAgain: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      console.log(data);
      try {
        const { data } = await signIn({ username, password });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export const SignUpForm = ({ onSubmit }) => {
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

      <TextInput
        style={[
          styles.inputBox,
          formik.touched.passwordAgain && formik.errors.passwordAgain
            ? styles.invalid
            : {},
        ]}
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.passwordAgain}
        onChangeText={formik.handleChange("passwordAgain")}
      />
      {formik.touched.passwordAgain && formik.errors.passwordAgain && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.passwordAgain}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textTertiary"}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
