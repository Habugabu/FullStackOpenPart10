import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";

const Repository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  const item = repository ? repository : {};

  if (!item) {
    return <></>;
  }

  return <RepositoryItem item={item} displayLink />;
};

export default Repository;
