import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from './User'
import { number } from 'yup'

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
  public thumbnail:string

  @column()
  public userId:number

  @hasMany(() =>Comment)
  public comments: HasMany<typeof Comment>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
