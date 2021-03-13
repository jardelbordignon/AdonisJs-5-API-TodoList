import { LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}

export const softDelete = async (row: LucidRow, column: string = 'deleted_at') => {
  if(row[column] !== undefined) {
    row[column] = DateTime.local()
    await row.save();
  }
}
