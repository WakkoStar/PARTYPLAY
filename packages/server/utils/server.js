import { createServer } from 'http';

import createStaticAsset from 'node-static';

const fileServer = new createStaticAsset.Server('./public');

const httpServer = createServer((req, res) => {
  fileServer.serve(req, res);
});

export default httpServer;
