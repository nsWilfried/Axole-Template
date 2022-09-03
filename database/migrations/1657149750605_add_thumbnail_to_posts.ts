import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'add_thumbnail_to_posts'

  public async up () {
    this.schema.alterTable('posts', (table) => {
      table.string('thubmnail').notNullable().defaultTo('https://picsum.photos/seed/picsum/200/300')
    })
  }

}
