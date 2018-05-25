/**
 * Created by: Varun kumar
 * Date: 23 May, 2018
 */

const { makeExecutableSchema } = require('graphql-tools');

// The GraphQL schema in string form
const typeDefs = `
    type Query { 
        profile(email: String!): User 
        users: [User]
        getUser(email: String!): User
    }

    type User { 
        id: Int!, 
        mobile: Int
        name: String 
        gender: String
        email: String!
        dob: String
        deactivated: Boolean
        type: String
        createdAt: String
        modifiedAt: String
    }

    type Mutation {
        createUser(email: String!): User
        updateUser(email: String!): User
    }
`;

// The resolvers
const resolvers = {
    Query: { 
        profile: (obj, args, context, info) => {
            return {
                id: 1,
                email: 'varunon9@gmail.com'
            }
        },
        users: (obj, args, context, info) => {

        },
        getUser: (obj, args, context, info) => {

        }
    },
    User: {
        id: (obj, args, context, info) => {

        },
        mobile: (obj, args, context, info) => {

        },
        name: (obj, args, context, info) => {

        },
        gender: (obj, args, context, info) => {

        },
        email: (obj, args, context, info) => {

        },
        dob: (obj, args, context, info) => {

        },
        deactivated: (obj, args, context, info) => {

        },
        type: (obj, args, context, info) => {

        },
        createdAt: (obj, args, context, info) => {

        },
        modifiedAt: (obj, args, context, info) => {

        }
    },
    Mutation: {
        createUser: (obj, args, context, info) => {
            return {};
        },
        updateUser: (obj, args, context, info) => {
            return {};
        }
    }
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;