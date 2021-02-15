import express from 'express';
import bodyPasrser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';


const app = express();
dotenv.config()

//Delimitação do tamanho das estruturas em transito e requisição. 
app.use(bodyPasrser.json({limit: "30mb", extended: true}));
app.use(bodyPasrser.urlencoded({limit: "30mb", extended: true}));

//Cors, export e conect
app.use(cors())

//Rotas, PostRoutes
app.use('/post', postRoutes)

//Conectando o mangoDB atlas por string url conection.

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database established')
})

mongoose.set('useFindAndModify', false)