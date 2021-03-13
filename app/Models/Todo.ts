import { column } from '@ioc:Adonis/Lucid/Orm';
import Default from './Default';

export default class Todo extends Default {

  @column()
  public user_id: number

  @column()
  public title: string

  @column()
  public is_completed: boolean

}
