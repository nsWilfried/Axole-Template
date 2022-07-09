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
import Post from 'App/Models/Post'
import User from 'App/Models/User'
Route.get('/', async()=> {
  const posts = Post.query().preload('comments')
  return await posts
}).as('home')

Route.get('/user/register', async () => {
  const users = await User.query()
  return  users
} )
Route.post('/user/login', 'AuthController.login')
Route.post('/user/register', 'AuthController.register')