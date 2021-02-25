const express = require('express');
const mongoose = require ('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const CONNECTION_URL = 'mongodb://localhost:27017/graphqldb';
const PORT = process.env.PORT|| 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
