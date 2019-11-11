const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      expressGraphQL = require("express-graphql"),
      cors = require("cors"),
      keys = require('../config/keys'),
      AWS = require('aws-sdk'),
      fs = require('fs'),
      graphQL = require('graphql');

const { ApolloServer, gql } = require('apollo-server');
const db = require("../config/keys").mongoURI;
const models = require("./models/index"),
      schema = require("./schema/schema");
      
const app = express();

const typeDefs = gql `
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    _ : Boolean
  }

  type Mutation {
    singleUpload(file: Upload!): File!,
    singleUploadStream(file: Upload!): File!
  }
`;

const resolvers = {
  Mutation: {
    singleUpload: (parent, arg) => {
      return args.file.then(file => {
        const {
          createReadStream,
          filename,
          mimetype
        } = file

        const fileStream = createReadStream()

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))

        return file;
      })
    },

    singleUploadStream: async (parent, args) => {
      const file = await args.file
      const {
        createReadStream,
        filename,
        mimetype
      } = file
      const fileStream = createReadStream()

      const uploadParams = {
        Bucket: 'whiskr-seeds',
        Key: filename,
        Body: fileStream
      };
      const result = await s3.upload(uploadParams).promise()

      console.log(result)

      return file;
    }
  }
};


const AWSConfig = AWS.config.update({
  secretAccessKey: keys.AWSSecretKey,
  accessKeyId: keys.AWSAccessKey,
  region: keys.AWSRegion
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`\`🚀  Server ready at ${url}`);
})

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => ({
    schema,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
  }))
);

module.exports = app;
