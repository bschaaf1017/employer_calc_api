import * as moduleAlias from 'module-alias';

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
console.log('env: ', process.env.NODE_ENV)
console.log('sourcePath: ', sourcePath)
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@domain': `${sourcePath}/domain`,
});

import { createServer } from '@config/express';
// import { AddressInfo } from 'net';
// import http from 'http';
// import { logger } from '@config/logger';

// const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5001';

async function startServer() {
  console.log('node env: ', process.env.NODE_ENV)
  createServer(port);
  // const server = http.createServer(app).listen({ host, port }, () => {
  //   const addressInfo = server.address() as AddressInfo;
  //   logger.info(
  //     `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
  //   );
  // });

  // const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  // signalTraps.forEach((type) => {
  //   process.once(type, async () => {
  //     logger.info(`process.once ${type}`);

  //     server.close(() => {
  //       logger.debug('HTTP server closed');
  //     });
  //   });
  // });
}

startServer();
