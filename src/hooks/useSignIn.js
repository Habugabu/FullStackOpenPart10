import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const token = await mutate({ variables: { username, password } });

    return token;
  };

  return [signIn, result];
};

export default useSignIn;
