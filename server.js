const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

const app = express();

// GraphQl schema definition
const schema = buildSchema(`
  type Clothing {
    id: Int
    name: String
    type: String
  }

  type Query {
    clothing(id: Int): Clothing
    clothingByType(type: String): [Clothing]
    allClothing: [Clothing]
  }

  type Mutation {
    addClothing(clothing: [ClothingInput]): [Clothing]
    updateClothing(id: Int, name: String, type: String): Clothing
    deleteClothing(ids: [Int]): [Clothing]
  }

  input ClothingInput {
    name: String
    type: String
  }
`);


// Simuloidaan tietokantaa JSON-tiedoston avulla
let data = JSON.parse(fs.readFileSync('data.json'));

// Definition of resolvers and mutations
const existingData = JSON.parse(fs.readFileSync('data.json'));
const root = {
  clothing: (args) => data.find(item => item.id === args.id), // query for clothing by ID
  clothingByType: (args) => data.filter(item => item.type === args.type), // query for clothing by type
  allClothing: () => data, // query for all clothing items
  addClothing: (args) => { // function for adding one or several clothes
    const newClothingItems = args.clothing.map(clothingItem => {
      const newClothing = {
        id: data.length + 1,
        name: clothingItem.name,
        type: clothingItem.type,
      };
      existingData.push(newClothing);
      return newClothing;
    });
  
    fs.writeFileSync('data.json', JSON.stringify(data));
  
    return newClothingItems;
  },
  updateClothing: (args) => { // function for updating one or several clothes
    const clothingToUpdate = data.find(item => item.id === args.id);

    if (clothingToUpdate) {
      if (args.name) {
        clothingToUpdate.name = args.name;
      }
      if (args.type) {
        clothingToUpdate.type = args.type;
      }

      fs.writeFileSync('data.json', JSON.stringify(existingData));

      return clothingToUpdate;
    }

    return null;
  },
  deleteClothing: (args) => { // function for deleting one or several clothes
    const deletedClothing = [];

    args.ids.forEach(id => {
      const index = data.findIndex(item => item.id === id);

      if (index !== -1) {
        deletedClothing.push(data[index]);
        data.splice(index, 1);
      }
    });

    fs.writeFileSync('data.json', JSON.stringify(existingData));

    return deletedClothing;
  },
  
};

// GraphQL route setup
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // GraphiQL UI
}));

app.listen(4000, () => {
  console.log('GraphQL server is open at http://localhost:4000/graphql');
});
