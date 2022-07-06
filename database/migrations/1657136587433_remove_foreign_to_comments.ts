import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'remove_foreign_to_comments'

  public async up () {
    this.schema.alterTable('comments', (table) => {
      table.dropColumn('user_id')
    })
  }

}
