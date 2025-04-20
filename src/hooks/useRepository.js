import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const result = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return result.data ? result.data : {};
};

export default useRepository;
