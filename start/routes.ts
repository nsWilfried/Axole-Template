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

  const users = User.query().preload('posts')

  return await users
}).as('home')

Route.get('/users',async () => {
  const users = await User.query()
  return users;
})

Route.get('/posts',async () => {
  const posts = await Post.query().preload('user')
  return posts;
})

Route.get('/comments',async () => {
  const comments = await Comment.query()
  return comments;
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


// FIND WITH CONTENT ID 
Route.get('/comments/:id',"BlogController.retrieveOneComment")
Route.get('/posts/:id',"BlogController.retrieveOnePost")
Route.get('/users/:id',"BlogController.retrieveOneUser")


// UPDATE
Route.put("/posts/:id", "BlogController.updatePost")