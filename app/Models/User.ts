import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany
} from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email:string 

  @column()
  public password:string

  @column()
  public isAdmin:boolean

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
