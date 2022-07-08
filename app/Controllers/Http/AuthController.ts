import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
export default class AuthController {

    public async register({request, response}: HttpContextContract){

        try{
            const user = await User.create({
                username: request.input('username'), 
                email: request.input('email'),
                password: request.input('password')


            })

            response.redirect().toPath(`http://localhost:3000/user/login`)
        }
        catch(error){
            console.log('erreur lors de l\'ajout du user dans la db')
            console.log(error)
            response.redirect(`localhost:3000/user/register`)
        }
       

    }

    public async login({request, auth, response}:HttpContextContract){
        const username = request.input('username')
        const email = request.input('email')
        const password = request.input('password')
        const remember = request.input('remember')
        let rememberMe = false

        if(remember == 'on'){
            rememberMe = true
        } else {
            return rememberMe;
        }

        try{
            await auth.use('web').attempt(username, password, rememberMe)
            response.redirect(`${Env.get('CLIENT_URL')}`)
        }
        catch{

        }
    }
}
