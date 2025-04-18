import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          reviewCount
          ratingAverage
          stargazersCount
          ownerAvatarUrl
          language
        }
      }
    }
  }
`;

// other queries...
