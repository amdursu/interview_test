import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Auchan Test Typescript Server!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
