import find = require('find');
import { existsSync, readFileSync } from 'fs';
// import * as moment from 'moment';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { join as pathJoin } from 'path';
import { getDirectories } from './util';

export default function loadSchema() {
  const schemaTypes = getDirectories(pathJoin(__dirname, 'schema'));

  const typeSchemas: string[] = [];
  const schemaFiles = find.fileSync(
    /\.graphql$/,
    pathJoin(__dirname, 'schema')
  );
  schemaFiles.forEach((schemaFile: string) =>
    typeSchemas.push(readFileSync(schemaFile, 'utf8'))
  );

  const typeResolvers: object[] = [];
  schemaTypes.forEach(t => {
    const resolverFile = `./schema/${t}/resolvers`;
    if (existsSync(pathJoin(__dirname, `${resolverFile}.ts`))) {
      typeResolvers.push(require(resolverFile));
    }
    if (existsSync(pathJoin(__dirname, `${resolverFile}.js`))) {
      typeResolvers.push(require(resolverFile));
    }
  });

  // In production there is a single schema file
  if (typeSchemas.length === 0) {
    typeSchemas.push(
      readFileSync(pathJoin(__dirname, 'schema.graphql'), 'utf8')
    );
  }

  const resolvers: any = merge({}, ...typeResolvers);

  const executableSchema: any = makeExecutableSchema({
    resolvers,
    typeDefs: typeSchemas,
  });

  return executableSchema;
}
