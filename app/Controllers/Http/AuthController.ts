import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'

import User from 'App/Models/User'
import File from 'App/Models/File'

export default class AuthController {

  public async signIn ({ request, auth }: HttpContextContract) {

    const signInSchema = schema.create({
      email: schema.string({}, [ rules.email() ]),
      password: schema.string()
    })

    const { email, password } = await request.validate({ schema: signInSchema })

    const token = await auth.use('api').attempt(email, password)

    if (token) {
      const user = await User.findBy('email', email)
      if (!user) return null

      const file = await File.query()
        .where('model_name', 'User')
        .andWhere('model_id', user.id)
        .first()

      return {
        token: token.toJSON(),
        user: {
          id: user.id,
          name: user.name,
          avatar: file ? `${Env.get('APP_URL')}/images/${file.file_name}` : null
        }
      }
    }
  }
}
