import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUseridToPosts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.dropTableIfExists("comments")
    this.schema.dropTableIfExists(this.tableName)
      this.schema.createTableIfNotExists(this.tableName, (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('slug').notNullable()
        table.string('thumbnail').notNullable().defaultTo('https://picsum.photos/seed/picsum/200/300')
        table.integer('user_id').unsigned().references("users.id")
        table.text('description', 'longtext').notNullable()
        table.text('content','longtext').notNullable
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
      this.schema.createTableIfNotExists("comments", (table) => {
        table.increments('id').primary()
        table.text('message', 'longtext').notNullable()
        table.integer('post_id').unsigned().references("posts.id").onDelete('CASCADE')
        table.integer('user_id').unsigned().references("users.id")
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
  }
}
