import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete';


export default class Default extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deleted_at: DateTime


  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
