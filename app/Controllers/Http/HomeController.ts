// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

  public async index(): Promise<object> {
    return { hello: 'AdonisJs 5' }
  }
}
