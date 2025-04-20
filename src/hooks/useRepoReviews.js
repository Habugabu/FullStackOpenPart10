import { useQuery } from "@apollo/client";

import { GET_REPO_REVIEWS } from "../graphql/queries";

const useRepoReviews = (id) => {
  const result = useQuery(GET_REPO_REVIEWS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return result.data
    ? result.data.repository
      ? result.data.repository
      : []
    : [];
};

export default useRepoReviews;
