import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id')
      table.string('username').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.boolean('isAdmin').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
