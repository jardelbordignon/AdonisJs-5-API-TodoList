import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('model_id')
      table.string('model_name')
      table.string('file_name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
