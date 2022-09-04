/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts

| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'

// GET ALL CONTENT
Route.get('/', async()=> {

  const users = User.query().preload('posts', (query) => {
    query.preload('comments')
  })

  return await users
}).as('home')

Route.get('/users',async () => {
  const users = await User.query()
  return users;
})

Route.get('/posts',async () => {
  const posts = await Post.query().preload('user').preload('comments', (query) => {
    query.preload('users')
  })
  return posts;
})

Route.get('/comments',async () => {
  const comments = await Comment.query()
  return comments;
})

// FIND WITH CONTENT ID 
Route.get('/comments/:id',async (request) => {
  const comments = await Comment.findOrFail(request.params.id)
  return comments;
})
Route.get('/posts/:id',async (request) => {
  const post = await Post.findOrFail(request.params.id)
  return post;
})

Route.get('/:id',async (request)=> {
  const post = await Post.findBy('slug', request.params.id)
  // await post?.load(loader => {
  //   loader.load('comments', comment => {
  //     comment.preload('users')
  //   }).load('user')
  // })
  
  return post;
})
Route.get('/users/:id',async (request) => {
  const users = await User.findOrFail(request.params.id)
  return users;
})

Route.get('/user/register', async () => {
  const users = await User.query()
  return  users
} )

// POSTS
Route.post('/user/login', 'AuthController.login')
Route.post('/user/register', 'AuthController.register')
Route.post('/contact', 'ContactController.send')
Route.post('/logout', 'AuthController.logout')
Route.post('/create-post', 'BlogController.createPost')
Route.post('/comments', 'BlogController.addComment')
Route.get('/downloads/:fileName', 'BlogController.download')
