import * as path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
// const resolversArray = [userResolvers, welcomeResolvers];

/*  AUTOMATED APPROACH: Put your resolvers anywhere
with ".resolvers.[js/ts]" naming convention */
const resolvers = fileLoader(path.join(__dirname, './**/*.resolvers.js'));

const types = fileLoader(path.join(__dirname, './**/*.types.js'));
const typeDefs = mergeTypes(types);

export { resolvers, typeDefs };
