import { EntitySchema, DataSource } from "typeorm";

let Connection = null;

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
  },
})

const Post = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    title: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
    },
  },
})


export async function getConnection() {
  if (!Connection) {
    Connection = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: true,
      logging: false,
      entities: [User, Post],
    })
  }
  await Connection.initialize()
  console.log('Database connection initialized')
}
