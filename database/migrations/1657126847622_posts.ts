import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async down () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('thumbnail').notNullable().defaultTo('https://picsum.photos/seed/picsum/200/300')
      table.text('description', 'longtext').notNullable()
      table.text('content','longtext').notNullable
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async up () {
    this.schema.dropTable(this.tableName)
  }
}
