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

            response.redirect().toPath(`http://localhost:3000/user/login`)
        }
        catch(error){
            console.log('erreur lors de l\'ajout du user dans la db')
            console.log(error)
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
        } else {
            return rememberMe;
        }

        try{
            await auth.use('web').attempt(email, password, rememberMe)
            response.redirect().toPath(`http://localhost:3000/`)
        }
        catch(error){

            console.log('failed to login', error)
            response.redirect().toPath(`http://localhost:3000/user/login`)

        }
    }
}
