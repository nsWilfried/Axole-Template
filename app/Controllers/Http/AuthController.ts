import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {

    public async register({request, response}: HttpContextContract){

        try{
            const user = await User.create({
                username: request.input('username'), 
                email: request.input('email'),
                password: request.input('password')


            })
            request.cookie('isConnected', true)
            response.redirect().toPath(`http://localhost:3000/user/login`)
        }
        catch(error){
            //console.log('erreur lors de l\'ajout du user dans la db')
            //console.log(error.type)
            response.redirect(`http://localhost:3000/user/register`)
        }
       

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
            response.redirect().toPath(`http://localhost:3000/`)
        }
        catch(error){

            const errorCode = error.responseText.split(':')[0]
            //console.log('failed to login', error.responseText.split(':'))
            response.redirect().toPath(`http://localhost:3000/user/login?error=${errorCode}`)

        }
    }
}
