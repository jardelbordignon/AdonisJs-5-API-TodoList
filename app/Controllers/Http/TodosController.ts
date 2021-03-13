import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Redis from '@ioc:Adonis/Addons/Redis'

import Todo from 'App/Models/Todo'

export default class TodosController {

  public async index({ request, response, auth }: HttpContextContract) {
    if (!auth.user) return null

    const page = request.input('page', 1)
    const limit = request.input('per_page', request.input('limit', 10))

    const cacheKey = `user-todos:${auth.user.id}`

    let todos = await Redis.get(cacheKey) as string | Todo[]

    if (!todos) {
      todos = await auth.user.related('todos').query()
        .whereNull('deleted_at').paginate(page, limit)

      await Redis.set(cacheKey, JSON.stringify(todos))
    }

    return response.json(todos) //todos.map(todo => todo.serialize({ fields: ['id', 'title'] }))
  }

  public async show({ response, params }: HttpContextContract) {
    const todo = await Todo.find(params.id)

    if (!todo) return response.status(400).json({ message: 'Todo not found' })

    return response.json(todo)
  }

  public async store({ request, response }: HttpContextContract) {
    const todo = await Todo.create({
      title: request.input('title'),
      is_completed: false
    })

    return response.json(todo)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)

    todo.title = request.input('title', todo.title)
    todo.is_completed = request.input('is_completed', todo.is_completed)
    await todo.save()

    const updatedTodo = await Todo.find(todo.id)

    return response.status(202).json(updatedTodo)
  }

  public async destroy({ response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    //await todo.delete()
    await todo.softDelete()

    return response.status(204)
  }

}
