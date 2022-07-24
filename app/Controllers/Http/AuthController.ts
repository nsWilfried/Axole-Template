import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {

    client = 'http://localhost:3000'
    public async register({request, response}: HttpContextContract){

        try{
            const user = await User.create({
                username: request.input('username'), 
                email: request.input('email'),
                password: request.input('password')


            })
            response.cookie('isConnected', true, {
                domain: this.client, 
                path: '/'
            })
            response.redirect().toPath(`/user/login`)
        }
        catch(error){
            //console.log('erreur lors de l\'ajout du user dans la db')
            //console.log(error.type)
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
            //console.log(rememberMe)
            await auth.use('web').attempt(email, password, rememberMe)
            response.redirect().toPath(this.client)
        }
        catch(error){
            const errorCode = error.responseText.split(':')[0]
            //console.log('failed to login', error.responseText.split(':'))
            response.redirect().toPath(`${this.client}/user/login?error=${errorCode}`)

        }
    }
}
