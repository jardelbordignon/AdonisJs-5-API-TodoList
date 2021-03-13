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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index')

  Route.post('/signin', 'AuthController.signIn')
  Route.post('/signup', 'UsersController.signUp')

  Route.get('/images/:path', 'FilesController.show')

  Route.group(() => {
    Route.get('/dash', async () => ({ hello: 'dashboard', }))

    Route.resource('/todos', 'TodosController').apiOnly()

    Route.post('/myTodos', 'UsersController.manageTodos')

    Route.post('/files', 'FilesController.store')

  }).middleware('auth')
})
.prefix('v1')
