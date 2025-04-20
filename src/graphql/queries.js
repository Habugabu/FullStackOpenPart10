import { gql } from "@apollo/client";

import { REPO_BASIC_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
  query getRepository($id: ID!) {
    repository(id: $id) {
      url
      ...RepoBasicInfo
    }
  }
  ${REPO_BASIC_FRAGMENT}
`;

export const GET_REPO_REVIEWS = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
