export default `
type Query {
  organizations: [Organization]!
  organization(id: Int!): Organization!
}

type Mutation {
  createOrganization(input: CreateOrganizationInput!): Organization!
  addOrganizationMember(organizationId: Int!, username: String!, role: UserRole): Organization!
  addOrganizationRelatedLabel(incidentLabelId: Int!, organizationId: Int!): Organization!
  removeOrganizationRelatedLabel(incidentLabelId: Int!, organizationId: Int!): Organization!
}

type Organization {
  id: Int!
  name: String
  isGovernment: Boolean
  description: String
  officeAddress: String
  logoUrl: String
  members: [OrganizationMemberWithRole]
  relatedLabels: [IncidentLabel]
}

type OrganizationMemberWithRole implements UserType {
  id: Int!
  username: String!
  email: String!
  phone: String
  firstName: String!
  lastName: String!
  gender: UserGender!
  avatarUrl: String
  role: UserRole!
}

input CreateOrganizationInput {
  name: String!
  isGovernment: Boolean = false
  description: String = ""
  officeAddress: String!
}
`;
