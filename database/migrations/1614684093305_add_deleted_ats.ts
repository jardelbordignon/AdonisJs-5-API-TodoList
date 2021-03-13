import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddDeletedAts extends BaseSchema {
	protected tables = ['todos', 'users']

	public async up () {
    this.tables.forEach(table => (
      this.schema.alterTable(table, t => t.dateTime('deleted_at').defaultTo(null))
    ))
	}

	public async down () {
    this.tables.forEach(table => (
      this.schema.alterTable(table, t => t.dropColumn('deleted_at'))
    ))
	}
}
