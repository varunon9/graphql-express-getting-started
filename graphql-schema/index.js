/**
 * Created by: Varun kumar
 * Date: 23 May, 2018
 */

const { makeExecutableSchema } = require('graphql-tools');

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const GraphQLJSON = require('graphql-type-json');

// The GraphQL schema in string form
const typeDefs = `
    scalar JSON

    type Query { 
        profile: User!
    }

    type User { 
        id: Int, 
        mobile: String
        name: String 
        gender: String
        email: String
        dob: String
        deactivated: Boolean
        type: String
        createdAt: String
        modifiedAt: String,
        error: String
    }

    type Mutation {
        updateProfile(params: JSON!): User
    }
`;

// The resolvers
const resolvers = {
    JSON: GraphQLJSON,

    Query: { 
        profile: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                const params = {};
                params.email = context.user.email;

                userService.getUser(params)
                    .then(user => {
                        resolve(user);
                    }).catch(err => {
                        resolve({
                            error: err
                        });
                    });
            });
        }
    },
    User: {
        id: (root, args, context, info) => {
            return root.id;
        },
        mobile: (root, args, context, info) => {
            return root.mobile;
        },
        name: (root, args, context, info) => {
            return root.name;
        },
        gender: (root, args, context, info) => {
            return root.gender;
        },
        email: (root, args, context, info) => {
            return root.email;
        },
        dob: (root, args, context, info) => {
            return root.dob;
        },
        deactivated: (root, args, context, info) => {
            return root.deactivated;
        },
        type: (root, args, context, info) => {
            return root.type;
        },
        createdAt: (root, args, context, info) => {
            return root.createdAt;
        },
        modifiedAt: (root, args, context, info) => {
            return root.modifiedAt;
        },
        modifiedAt: (root, args, context, info) => {
            return root.error;
        }
    },
    Mutation: {
        updateProfile: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                const params = args.params;

                // can't update email and password
                params.email = context.user.email;
                delete params.password;
                
                userService.updateUser(params)
                    .then(user => {
                        resolve(user);
                    }).catch(err => {
                        resolve({
                            error: err
                        });
                    });
            });  
        }
    }
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;