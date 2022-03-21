import express from 'express';


const createServer = (port: string): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.post('/send-mail', (req: express.Request, res: express.Response) => {
    console.log('req::L', req.body)
    res.send('ok')
  })

  app.listen(port, () => console.log(`Express listening on port ${port}`))

  return app;
};

export { createServer };
