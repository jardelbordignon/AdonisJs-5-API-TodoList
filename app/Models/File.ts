import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public model_name: string

  @column()
  public model_id: number

  @column()
  public file_name: string

  static get computed () {
    return ['url']
  }

  getUrl ({ path }) {
    return `${Env.get('APP_URL')}/images/${path}`
  }

}
