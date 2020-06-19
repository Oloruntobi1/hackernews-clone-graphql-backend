const { GraphQLServer } = require("graphql-yoga")



let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// const resolvers = {
//     Query: {
//         info: () =>    `This is the API for the Hackernews clone`,

//         feed: () => links

//     },

//     Link: {
//         id: parent => parent.id,
//         description: parent => parent.description,
//         url: parent => parent.url
//     }
// }

let idCount = links.length

const resolvers = {
        Query: {
            info: () =>    `This is the API for the Hackernews clone`,
    
            feed: () => links,

            link: (parent, args) => {
                const link = links.find(link => link.id === args.id)
                // const link = links.filter(link => link.id === args.id)

               
               return link
            }
    
        },
    
        Mutation: {
            post: (parent, args) => {
               const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
               }

               links.push(link)
               return link
            },
            updateLink: (parent, args) => {
                const link = {
                    id: args.id,
                    url: args.url,
                    description: args.description
                }

                const argsIndex = args.id.split('-')
                // console.log(argsIndex)

                // links[args.id] = link
                links[argsIndex[1]] = link
                return link
            },
            deleteLink: (parent, args) => {
                const link = links.find(link => link.id === args.id)
                links.pop(link)
                // return link changed the return statement in the schema to a String so i updated this also
                return "Succesfully deleted"
            }
        }
    }

const server = new GraphQLServer({
    typeDefs: '../src/schema.graphql',
    resolvers,
})

server.start(() => console.log("Server is running on http://localhost:4000"))