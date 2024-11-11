import { ApolloError } from "apollo-server";
import Person from "../models/person.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationUser } from "../Validation/validation.js";
import dotenv from "dotenv";
dotenv.config();
const resolvers = {
  Query: {
    personCount: async () => {
      return Person.collection.countDocuments();
    },
    allPersons: async (_, args) => {
      return await Person.find();
    },
    findPersonById: async (_, args) => {
      try {
        const { id } = args;
        const person = await Person.findById();
        if (!id) return new ApolloError(" Error ID is Required", "ID_REQUIRED");
        return person;
      } catch {
        throw new ApolloError("Failed to fetch person by ID", "FETCH_ERROR");
      }
    },
    findPersonByName: async (_, args) => {
      try {
        const { name } = args;
        const person = await Person.findOne({ name: name });
        return person;
      } catch (error) {
        throw new ApolloError("Failed to fetch person by name", "FETCH_ERROR", {
          error,
        });
      }
    },
    me: (root, args, context) => {
      console.log("Context from resolver", context);
      return context.currentUser;
    },
  },

  Mutation: {
    addPerson: async (_, args) => {
      try {
        const { name, phone, city, street } = args;
        console.log(args);
        const Person = validationUser(args);
        console.log("Person Data", Person);
        const newPerson = new Person();

        await newPerson.save();
      } catch (error) {
        throw new ApolloError("ADD_ERROR", { message: "Failed to add person" });
      }
    },
    editNumber: async (_, args) => {
      try {
        if (!args.id)
          return new ApolloError(" Error ID is Required", "ID_REQUIRED");

        if (!args.phone)
          return new ApolloError("Error Phone is Required", "PHONE_REQUIRED");
        const person = await Person.findByIdAndUpdate(
          args.id,
          {
            phone: args.phone,
          },
          { new: true }
        );
        return person;
      } catch (error) {
        throw new ApolloError("Failed to edit phone number", "EDIT_ERROR", {
          error,
        });
      }
    },
    Register: async (_, args) => {
      const { username, password } = args;
      try {
        const userFind = await User.findOne({ username: username });
        if (userFind)
          return new ApolloError("Username already exists", "USERNAME_EXISTS");

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
          username: username,
          password: passwordHash,
        });
        return await user.save();
      } catch {
        return new ApolloError("Error to create User", { invalidArgs: args });
      }
    },
    login: async (_, args) => {
      try {
        const { username, password } = args;
        const user = await User.findOne({
          username: username,
        });

        if (!user)
          return new ApolloError("Error invalid credentials", {
            invalidArgs: "invalids credentials",
          });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
          return new ApolloError("Error invalid credentials", {
            invalidArgs: "invalids credentials",
          });

        const UserForToken = {
          username: user.username,
          id: user._id,
        };

        return { value: jwt.sign(UserForToken, process.env.JWT_SECRET) };
      } catch {
        return new ApolloError("Error to login", { invalidArgs: args });
      }
    },
  },
};
export default resolvers;
