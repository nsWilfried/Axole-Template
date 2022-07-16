import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public slug:string

  @column()
  public description: string

  @column()
  public content:string

  @column()
  public thubmnail:string


  @hasMany(() =>Comment)
  public comments: HasMany<typeof Comment>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
