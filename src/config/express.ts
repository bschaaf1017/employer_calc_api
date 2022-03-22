import express from 'express';
import cors from 'cors';

import { sendIt } from '../services/mail'


const createServer = (port: string): express.Application => {
  const app = express();

  app.use(cors({
    origin: '*'
  }))
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.post('/send-mail', async (req: express.Request, res: express.Response) => {
    console.log('mail service: ', sendIt)
    console.log('req::L', req.body)
    try {
      await sendIt(req.body)
      res.status(201).send('worked')
    } catch (e) {
      console.log(e);
      res.status(400)
    }
  })

  app.listen(port, () => console.log(`Express listening on port ${port}`))

  return app;
};

export { createServer };
