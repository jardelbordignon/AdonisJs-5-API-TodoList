import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'
import Todo from 'App/Models/Todo'

export default class UsersController {

	public async signUp({ request, response }: HttpContextContract) {
		const userSchema = schema.create({
			name: schema.string({}, [	rules.required() ]),
			email: schema.string({}, [
				rules.email(),
				rules.unique({ table: 'users', column: 'email' })
			]),
			password: schema.string({}, [	rules.confirmed() ])
		})

		const userData = await request.validate({ schema: userSchema })
		const user = await User.create(userData)

		return response.created(user)
	}

  public async manageTodos({ request, response, auth }: HttpContextContract) {
    if (!auth.user) return null
    // const todo1 = new Todo()
    // todo1.title = 'Todo test 1'
    // todo1.is_completed = false

    // const todo2 = new Todo()
    // todo2.title = 'Todo test 2'
    // todo2.is_completed = false

    //await auth.user.related('todos').saveMany([todo1, todo2])
    const { todos, variant } = request.requestBody
    const userTodos = await auth.user.related('todos')
      .updateOrCreateMany(todos, variant)

    return response.json(userTodos)
  }
}
