import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { compare } from 'bcrypt';
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import config from './config';
import { User } from './models/User';
import { WeatherResponse } from './models/WeatherResponse';
import mapWeatherConditions from './util/mapWeatherConditions';

dotenv.config();

const dbClient: DynamoDBClient = new DynamoDBClient(config.AWS_REMOTE_CONFIG);
const app: Express = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:4001',
};
app.use(cors(corsOptions));

app.get('/api/login', async (req: Request, res: Response) => {
  try {
    const inputEmail: string = req.query.email as string;
    const inputPassword: string = req.query.password as string;

    const query: ScanCommandInput = {
      TableName: config.AWS_DYNAMO_TABLE,
      ExpressionAttributeValues: {
        ':email': { S: inputEmail },
      },
      FilterExpression: 'email = :email',
    };

    const command: ScanCommand = new ScanCommand(query);
    const response: ScanCommandOutput = await dbClient.send(command);

    if (response.Items?.length && response.Items?.length > 0) {
      const { password, ...userDetails }: User = unmarshall(
        response.Items[0],
      ) as User;
      const matchingPassword: boolean = await compare(inputPassword, password);
      if (matchingPassword) {
        res.status(200).send({ success: true, body: userDetails });
      } else {
        res
          .status(400)
          .send({ success: false, message: 'Password incorrect!' });
      }
    } else {
      res
        .status(404)
        .send({ success: false, message: 'User email not found!' });
    }
  } catch (error: unknown) {
    res.status(500).send({ success: false, message: error });
  }
});

app.get(
  '/api/currentWeatherConditions',
  async (req: Request, res: Response) => {
    try {
      const { baseURL, latitude, longitude, current } = config.WEATHER_CONFIG;

      const response = await fetch(
        `${baseURL}?latitude=${latitude}&longitude=${longitude}&current=${current}&timezone=auto`,
      );
      const weatherConditions: WeatherResponse = await response.json();

      res
        .status(200)
        .send({ success: true, body: mapWeatherConditions(weatherConditions) });
    } catch (error: unknown) {
      res.status(500).send({ success: false, message: error });
    }
  },
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
