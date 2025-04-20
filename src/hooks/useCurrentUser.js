import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (includeReviews) => {
  const result = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  const user = result.data
    ? result.data.me
      ? result.data.me
      : undefined
    : undefined;

  return user;
};

export default useCurrentUser;
