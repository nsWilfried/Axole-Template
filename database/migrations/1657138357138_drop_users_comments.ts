import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drop_users_comments'

  public async up () {
    this.schema.dropTable("users_comments")
}

}
