import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

const useMe = () => {
  const result = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const username = result.data
    ? result.data.me
      ? result.data.me.username
      : undefined
    : undefined;

  return username;
};

export default useMe;
