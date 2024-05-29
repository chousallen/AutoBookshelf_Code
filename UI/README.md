A simply web where you can register your books and take it out (via arduino).

# Instruction

## Backend
```
├──node_modules
└──src
   ├──data
   │  └──books.js
   ├──py
   │  └──main.py
   ├──resolvers
   │  ├──Mutation.js
   │  └──Query.js
   ├──index.js
   └──schema.gql
```

type following commands in the terminal:
```
$ cd backend/
$ npm start
```

then go to http://localhost:4000/

## Frontend
```
├──node_modules
├──public
├──src
│  ├──assets
│  ├──ApolloProvider.jsx
│  ├──App.css
│  ├──App.jsx
│  └──main.jsx
└──index.html
```

type following commands in the terminal
```
$ cd frontend/
$ npm run dev
```

then go to http://localhost:5173/
