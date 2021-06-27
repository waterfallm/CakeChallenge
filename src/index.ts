import path from 'path';
import express from 'express';
import cors from 'cors';


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


import promBundle from 'express-prom-bundle';
import rateLimit from "express-rate-limit";
import bodyParser from 'body-parser';

import api from './routers/api';

dayjs.extend(utc);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000 // limit each IP to 100 requests per windowMs
});

const app = express();

//  apply to all requests
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

// Put all API endpoints under '/api'
app.use('/api', api);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Explorer running on port ${port}`);
});

