import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment';
import Post from 'App/Models/Post';

export default class BlogController {

    client = 'http://127.0.0.1:3000';
    public async createPost({request, response}: HttpContextContract){
        const post = {
            name : request.input('name').trim(), 
            description: request.input('description').trim(),
            slug: request.input('name').trim().split(' ').join('-'),
            content: request.input('content'), 
            thumbnail: request.file('cover')?.clientName, 
            userId: request.cookie('user').id
        }
        await Post.create(post)
        response.redirect().toPath(this.client)

    }

    public async addComment({request, params, response}:HttpContextContract){
        const comment = {
            message: request.input('message'), 
            userId: request.cookie('user').id, 
            postId: request.input('post_id')
        }

        await Comment.create(comment)
        response.redirect().toPath(`${this.client}/${params.id}`)
    }
}
