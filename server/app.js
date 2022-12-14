const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const {postRouter} = require("./src/routes");

mongoose
  .connect("mongodb+srv://OlehBabiak:NdMCuYEdQLmMRpWc@cluster0.rg1g0ph.mongodb.net/http-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is successfull");
  })
  .catch(( e ) => {
    console.log("no connection ");
  });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postRouter)

const start = async () => {
  try {
    if (!fs.existsSync('src')) {
      await fs.mkdirSync('src');
    }
    app.listen(8090, () => {
      console.log('App listen 8090');
    });
  } catch (err) {
    console.error(`Error on server startup: ${ err.message }`);
  }
};

start()
