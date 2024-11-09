import { ApolloError } from "apollo-server";

const validationUser = (Schema) => {
  if (!Schema) return new ApolloError(" USER is Required");
  const { name, city, street } = Schema;

  if (name === " ") return new ApolloError("NAME is Required");
  if (street === " ") return new ApolloError("STREET is Required");
  if (city === " ") return new ApolloError("CITY is Required");
};

const validationID = () => {};
export { validationUser, validationID };
