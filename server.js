const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

//middlewares
app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(express.json());

// mongo uri important boilerplate
//ATLAS_URI is the uri that i got from my mongo atlas, written on the env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
)
.then(()=>{
    console.log("MongoDB database connection established successfully");
})
.catch(err=>{
    console.log(err)
})
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

//routes
const blogsRouter = require('./routes/blogs');

app.use('/blogs', blogsRouter);


//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

//port
const port = process.env.PORT || 5001;

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
})
