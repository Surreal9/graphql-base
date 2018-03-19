import knex from './index';
import Promise from 'bluebird';

export function wipeDb() {
  return knex
    .raw(
      `select 'drop table if exists "' || tablename || '" cascade;' as cmd
    from pg_tables
    where schemaname = 'public';`
    )
    .then((result: any) => result.rows.map((r: any) => r.cmd))
    .then((commands: any) =>
      Promise.each(commands, (cmd: any) => knex.raw(cmd))
    );
}
