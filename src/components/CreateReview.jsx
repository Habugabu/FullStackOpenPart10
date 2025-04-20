import Text from "./Text";
import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";

import * as yup from "yup";

import theme from "../theme";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name required"),
  repoName: yup.string().required("Repository name required"),
  rating: yup
    .number("Rating must be a number from 0 to 100")
    .required("Rating required")
    .max(100, "Rating must be a number from 0 to 100")
    .min(0, "Rating must be a number from 0 to 100")
    .integer("Rating must be an integer"),
  text: yup.string(),
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
  ownerName: "",
  repoName: "",
  rating: "",
  text: "",
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    const { ownerName, repoName, rating, text } = values;
    try {
      const { data } = await createReview({
        ownerName,
        repoName,
        rating: parseInt(rating),
        text,
      });
      console.log(data);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewForm onSubmit={onSubmit} />;
};

const ReviewForm = ({ onSubmit }) => {
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
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.invalid
            : {},
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputBox,
          formik.touched.repoName && formik.errors.repoName
            ? styles.invalid
            : {},
        ]}
        placeholder="Repository name"
        value={formik.values.repoName}
        onChangeText={formik.handleChange("repoName")}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.repoName}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputBox,
          formik.touched.rating && formik.errors.rating ? styles.invalid : {},
        ]}
        placeholder="Rating from 0 to 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputBox,
          formik.touched.text && formik.errors.text ? styles.invalid : {},
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textTertiary"}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
