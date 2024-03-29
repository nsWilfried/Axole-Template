import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async down () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('message', 'longtext').notNullable()
      table.integer('post_id').unsigned().references("posts.id").onDelete('CASCADE')
      table.integer('user_id').unsigned().references("users.id")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async up () {
    this.schema.dropTable(this.tableName)
  }
}
