//Ensure MongoDB Community Service running
//Enter terminal commands first:
//npm install mongoose
//Start server:
//npm start
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('DB connected')
);
const connection = mongoose.connection;
connection.once(
    'open',
    () => { 
        console.log('DB connection established');
    }
);

app.use(express.static('client/build'));

const addRouter = require('./routes/contacts');
app.use('/contacts', addRouter);

app.listen(port, 
    () => console.log(`Running on ${port}`)
);