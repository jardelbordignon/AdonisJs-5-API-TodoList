import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserIdTodos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.integer('user_id').defaultTo(null)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('user_id')
    })
  }
}
