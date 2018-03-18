import bodyParser = require('body-parser');
import express = require('express');
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createServer } from 'http';
import loadSchema from './schema-loader';
import { displayServer } from './util';
import { GraphqlContext } from './graphql-context';
import { get } from 'lodash';

export function run({ PORT: serverPort = 4000 }: any): any {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const schema = loadSchema();

  // Setup graphql endpoint
  app.use(
    '/graphql',
    graphqlExpress(req => {
      const user = get(req, 'user', {});
      return {
        schema,
        context: new GraphqlContext(user),
      };
    })
  );

  const initialGraphiqlQuery = `{
    # Hit ctrl-space to view the available queries, or explore the docs on the right

  }`;

  // Setup graphiql endpoint
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      query: initialGraphiqlQuery,
    })
  );

  // Catchall error handler
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // TODO: make prettier error objects
      console.log('ERROR:', err);

      // NOTE: from express-jwt
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
      }

      // NOTE: from node-jsonwebtokens
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Expired Token');
      }
    }
  );

  // need to use http's createServer to have ability to shut the server down
  const server = createServer(app);
  server.listen(serverPort, () => displayServer(server));

  return server;
}
