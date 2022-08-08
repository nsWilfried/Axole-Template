import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.dropTable("file_upload_endpoints")
    this.schema.dropTable("file_upload_histories")
    this.schema.dropTable("file_upload_webhooks")
    }
}
  