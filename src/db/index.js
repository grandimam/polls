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
    constructor() {}

    async createUser(userContent) {
        const conn = await getConnection()
        const userRepo = conn.getRepository('User')
        const newUser = userRepo.create({
            name: userContent.name,
            email: userContent.email,
        })
        await userRepo.save(newUser)
        console.log('New post saved successfully');
    }

    async deleteUser(userId) {
        const conn = await getConnection()
        const userRepo = conn.getRepository('User')
        await userRepo.delete(userId)
        console.log(`Post removed successfully with: ${postId}`);
    }
}

export class PostRepository {

    constructor() {}

    async createOrUpdatePost(userId, postContent) {
        const conn = await getConnection();
        const postRepo = conn.getRepository('Post');
        const userRepo = conn.getRepository('User');
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
    
    async deletePost(userId, postId) {
        const conn = getConnection()
        const userRepo = conn.getRepository('User')
        const user = userRepo.findOne({where: {user: {id: userId}}})
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const postRepo = conn.getRepository('Post')
        await postRepo.delete({id: postId})
        console.log(`Post removed successfully with: ${postId}`);
    }
}