import express from 'express';
import 'dotenv/config';

const SERVER_PORT = process.env.SERVER_PORT || 3001;



const app = express();

app.listen(+SERVER_PORT);

console.log(`Server run at http://localhost:${SERVER_PORT}`);
