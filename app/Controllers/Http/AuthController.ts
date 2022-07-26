import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {

    client = 'http://127.0.0.1:3000'
    public async register({request, response, auth}: HttpContextContract){

        try{
            const user = await User.create({
                username: request.input('username'), 
                email: request.input('email'),
                password: request.input('password')


            }).then(data => {
                console.log('voici ce qui se passe après la création du user', data)
            })

            this.setUserInfoCookie(response, user)
           
            response.redirect().toPath(`/user/login`)
        }
        catch(error){

            response.redirect(`${this.client}/user/register`)
        }
       

    }

    public async logOut({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        response.redirect().toPath(this.client)
    }

    public async login({request, auth, response}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const remember = request.input('remember')
        let rememberMe = false
        


        if(remember == 'on'){
            rememberMe = true
        } 

        try{
            await auth.use('web').attempt(email,password, rememberMe).then(data => {
                const user = data.$attributes
                this.setUserInfoCookie(response, {
                    id: user.id, 
                    email: user.email, 
                    profile: user.profile, 
                    isAdmin: user.isAdmin
                } )
            })
           
            response.redirect().toPath(this.client)
        }
        catch(error){
            const errorCode = error.responseText.split(':')[0]
            response.redirect().toPath(`${this.client}/user/login?error=${errorCode}`)

        }
    }

    public setUserInfoCookie(response, user){
        response.cookie('isConnected', true)
        response.cookie('user', user)
    }
}
