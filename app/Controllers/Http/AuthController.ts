import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
export default class AuthController {

    client = 'http://127.0.0.1:3000'
    public async register({request, response}: HttpContextContract){

        try {
            const payload = await request.validate(RegisterValidator)
            const user = await User.findBy("email", payload.email)
            if(!user){
                 
                await User.create({
                    username: request.input("username"),
                    email: request.input("email"), 
                    password: request.input("password")
                }).then(() => {
                    return response.status(200).json({
                    status: 200, 
                    message:" Utilisateur crée"
                })
                }, error => {
                    return response.status(400).json({
                        status: 400, 
                        message: "Indentifiants incorrects", 
                        error: error.message
                    })
                })
                
                

            } else {
                // utilisateur existe déjà 
                return response.status(409).json({
                    status: 409, 
                    message : "l'utilisateur exsite déjà"
                })
            }
           
            //response.redirect().toPath(`${this.client}/user/login`)
        }
        catch (error) {
            return response.status(400).json({
                    status: 400, 
                     message: "Erreur survenue", 
                    error:error.messages
                })
        }
       

    }

    public async logout({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        response.clearCookie('user')
        response.clearCookie('isConnected')
        response.redirect().toPath(this.client)
    }

    public async login({request, auth, response}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const remember = request.input('remember')
        let rememberMe = false
        

        await request.validate(LoginValidator)
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
        response.plainCookie('isConnected', true)
        response.plainCookie('user', user)
    }
}
