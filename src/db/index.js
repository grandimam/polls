import { DataSource } from "typeorm";

let Connection = null;

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
      entities: ['entity/*.js'],
    })
  }
  await Connection.initialize()
  console.log('Database connection initialized')
}

export class UserRepository {

    async saveOrUpdaTE(userContent) {
        const conn = await getConnection()
        const userRepo = conn.getRepository('User')
        const newUser = userRepo.create({
            name: userContent.name,
            email: userContent.email,
        })
        await userRepo.save(newUser)
        console.log('New post saved successfully');
    }

    async delete(userId) {
        const conn = await getConnection()
        const userRepo = conn.getRepository('User')
        await userRepo.delete(userId)
        console.log(`Post removed successfully with: ${userId}`);
    }
}

export class PostRepository {

    connection = null

    constructor(connection) {
        this.conn = connection
    }

    async get(userId, postId) {
        const userRepo = this.conn.getRepository('User')
        const user = userRepo.findOne({id: userId})
        if (!user) {
            throw new Error(`User not authenticated: ${userId}`)
        }
        const posts = user.posts
        return posts.filter(x => x.id == postId)
    }

    async saveOrUpdate(userId, postContent) {
        const postRepo = this.conn.getRepository('Post');
        const userRepo = this.conn.getRepository('User');
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const newPost = postRepo.create({
            title: postContent.title,
            choices: postContent.choices,
            user: user,
        });
        await postRepo.save(newPost);
        console.log('New post saved successfully');
    }
    
    async delete(userId, postId) {
        const userRepo = this.conn.getRepository('User')
        const user = userRepo.findOne({where: {user: {id: userId}}})
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const postRepo = this.conn.getRepository('Post')
        await postRepo.delete({id: postId})
        console.log(`Post removed successfully with: ${postId}`);
    }
}