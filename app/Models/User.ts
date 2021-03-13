import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Default from './Default'
import Todo from './Todo'

export default class User extends Default {

  @hasMany(() => Todo, { foreignKey: 'user_id' })
  public todos: HasMany<typeof Todo>

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
