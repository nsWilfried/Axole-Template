import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany
} from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from './Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email:string 

  @column({serializeAs: null})
  public password:string

  @column()
  public isAdmin:boolean

  @column()
  public rememberMeToken?:string

  @column()
  public profile:string

  @beforeSave()
  public static async hashPassword(user:User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
