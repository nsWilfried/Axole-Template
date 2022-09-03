import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'add_foreign_to_comments'

  public async up () {
    this.schema.alterTable('comments', (table) => {
      table.integer('user_id').unsigned().references("users.id")
    })
  }

}
