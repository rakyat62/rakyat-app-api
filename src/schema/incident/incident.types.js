export default `
type Query {
  incidents(
    status: IncidentStatus
    labels: [Int!]
    dateStart: DateTime
    dateEnd: DateTime
  ): IncidentCollection!
  incident(id: Int!): Incident!
  incidentLabels: [IncidentLabel!]!
}

type Mutation {
  createIncident(input: CreateIncidentInput!): Incident!
  addIncidentHistory(input: CreateIncidentHistoryInput!): IncidentHistory!
}

type Subscription {
  newIncident: Incident!
}

scalar MySqlFieldGroupBy
type IncidentCollection {
  nodes (
    offset: Int
    limit: Int
    orderBy: IncidentOrder
  ): [Incident!]!
  stats(groupBy: MySqlFieldGroupBy!): [DataGroupStats]!
  totalCount: Int!
}
type DataGroupStats {
  count: Int!
  fieldGroup: MySqlFieldGroupBy!
}
input IncidentOrder {
  field: IncidentOrderField
  direction: OrderDirection
}
enum IncidentOrderField {
  createdAt
  label
  status
}
enum OrderDirection {
  ASC
  DESC
}

scalar DateTime
type Incident {
  id: Int!
  information: String
  status: IncidentStatus!
  locationAddress: String
  locationLat: Float!
  locationLng: Float!
  label: IncidentLabel!
  createdBy: User!
  histories: [IncidentHistory]!
  historiesCount: Int!
  images: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum IncidentStatus {
  OPEN
  CLOSED
}

input CreateIncidentInput {
  information: String!
  locationAddress: String
  locationLat: Float!
  locationLng: Float!
  # label ID
  label: Int!
  # image URLs
  images: [String!] = []
}


type IncidentLabel {
  id: Int!
  name: String!
  icon: String!
  incidents (
    status: IncidentStatus
    dateStart: DateTime
    dateEnd: DateTime
  ): IncidentCollection!
  relatedOrganizations: [Organization]!
}


type IncidentHistory {
  id: Int!
  content: String
  type: IncidentHistoryType!
  images: [String!]!
  createdBy: User!
  createdAt: DateTime!
}

input CreateIncidentHistoryInput {
  content: String
  type: IncidentHistoryType!
  incidentId: Int!
  # image URLs
  images: [String!] = []
}

enum IncidentHistoryType {
  FOLLOW_UP
  COMMENT
}
`;
