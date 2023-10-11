# TestQL
Testing querying and mutating dummy data with GraphQL in GraphiQL UI.

The program is a GraphQL-based server that simulates a clothing database using a JSON file called "data.json." It provides functionality for querying, adding, updating, and deleting clothing items.

Key features:

Schema Definition: The program defines a GraphQL schema that includes a "Clothing" type with properties like "id," "name," and "type." It also defines queries and mutations to interact with the clothing data.

Data Simulation: It loads the initial clothing data from the "data.json" file to simulate a database. This data includes clothing items with unique IDs, names, and types (e.g., tops, bottoms, accessories).

Queries: The program allows users to execute GraphQL queries to retrieve clothing items by ID, type, or all items. Queries are case-insensitive.

Mutations: Users can add new clothing items, update existing items, or delete items. When adding or updating items, the program ensures that the data in the JSON file is updated appropriately.

JSON Data Persistence: It uses the Node.js "fs" module to read and write data to the "data.json" file. This ensures that data modifications persist between server restarts.

GraphQL Server: The program uses Express.js and the "express-graphql" middleware to create a GraphQL API that allows users to interact with the clothing data through a graphical interface (GraphiQL) at http://localhost:4000/graphql.

In summary, this program demonstrates how to build a GraphQL server to manage clothing data, providing various query and mutation operations while ensuring data persistence in a JSON file. It also includes basic error handling and case-insensitive query capabilities.
