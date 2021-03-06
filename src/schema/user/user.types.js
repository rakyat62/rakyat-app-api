export default `
type Query {
  users(keywords: String): [User!]!
  user(id: String, username: String): User!
  me: User!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  login(input: LoginUserInput!): AuthPayload!
}

type User implements UserType {
  id: Int!
  username: String!
  email: String!
  phone: String
  firstName: String!
  lastName: String!
  gender: UserGender!
  avatarUrl: String
  organizations: [UserOrganizationWithRole]
}

type UserOrganizationWithRole {
  id: Int!
  name: String
  isGovernment: Boolean
  description: String
  officeAddress: String
  logoUrl: String
  role: UserRole!
}

enum UserRole {
  OWNER
  MEMBER
  ADMIN
}

enum UserGender {
  MALE
  FEMALE
}

input CreateUserInput {
  username: String!
  email: String!
  phone: String
  firstName: String!
  lastName: String!
  gender: UserGender!
  password: String!
}

interface UserType {
  id: Int!
  username: String
  email: String
  phone: String
  firstName: String
  lastName: String
}

type AuthPayload {
  token: String!
  user: User!
}

input LoginUserInput {
  username: String!
  password: String!
}
`;
