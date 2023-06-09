import { QueryBuilder } from './QueryBuilder';

test('Test update statement with condition', () => {
  const qb = new QueryBuilder('mysql');

  expect(
    qb
      .table('users')
      .update({ name: 'query-master' })
      .where({ id: 5 })
      .toRawSQL()
  ).toBe("UPDATE `users` SET `name`='query-master' WHERE `id`=5;");
});

test('Test select table without selected field', () => {
  const qb = new QueryBuilder('mysql');
  expect(qb.table('users').select().toRawSQL()).toBe('SELECT * FROM `users`;');
});

test('Test select table selected field', () => {
  const qb = new QueryBuilder('mysql');
  expect(qb.table('users').select('id', 'name').toRawSQL()).toBe(
    'SELECT `id`,`name` FROM `users`;'
  );
});

test('Test select table selected field with limit', () => {
  const qb = new QueryBuilder('mysql');
  expect(qb.table('users').select('id', 'name').limit(10).toRawSQL()).toBe(
    'SELECT `id`,`name` FROM `users` LIMIT 10;'
  );
});
