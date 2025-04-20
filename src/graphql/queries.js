import { gql } from "@apollo/client";

import { REPO_BASIC_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepoBasicInfo
        }
      }
    }
  }
  ${REPO_BASIC_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      url
      ...RepoBasicInfo
    }
  }
  ${REPO_BASIC_FRAGMENT}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
