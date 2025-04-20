import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

import { useState } from "react";

const useSignOut = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();

    setLoggedOut(true);
  };

  return [signOut, loggedOut];
};

export default useSignOut;
