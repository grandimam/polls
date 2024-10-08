import {getConnection} from 'database.js'

async function getUser(userId) {
    const conn = await getConnection()
    const userRepo = conn.getRepository('User')
    return userRepo.findById(userId)
}

export async function createOrUpdate(userId, postContent) {
    const user = await getUser(userId)
    const conn = await getConnection()
    const postRepo = conn.getRepository('Post')
    if (!postContent.postId) {
        postRepo.create({

        })
    } else {
        const postId = postContent.postId
        const post = postRepo.findById({id: postId})
        postRepo.save(post)
    }

}

export async function deletePost(userId, postId) {
    const user = await getUser(userId)
    const conn = await getConnection()
    const postRepo = conn.getRepository('Post')
    postRepo.delete({id: postId})
}