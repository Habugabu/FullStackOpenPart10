import { gql } from "@apollo/client";

export const REPO_BASIC_FRAGMENT = gql`
  fragment RepoBasicInfo on Repository {
    id
    description
    forksCount
    fullName
    reviewCount
    ratingAverage
    stargazersCount
    ownerAvatarUrl
    language
  }
`;
