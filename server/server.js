const express = require('express')
const app = express()
const port =process.env.PORT || 8000
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql')


app.use(bodyParser.json())


app.use('/graphql', graphqlHTTP({
    schema : buildSchema(`

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
        }
        ,
        createEvent: (args) => {
            const eventName = args.name;
            return "hello " + eventName;
        }
       
    },
    graphiql: true
}))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

