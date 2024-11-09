import { gql } from "apollo-server";
const typeDefs = gql`
  enum YESNO {
    YES
    NO
  }

  type Person {
    name: String!
    phone: String
    city: String!
    street: String!
    id: ID!
  }

  type User {
    username: String!
    password: String!
    friends: [Person]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YESNO): [Person]!
    findPersonById(id: ID!): Person
    findPersonByName(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      city: String!
      street: String!
    ): Person
    editNumber(id: ID!, phone: String!): Person

    Register(username: String!, password: String!): User

    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
