import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactController {
    client = "http://localhost:3000/"
    public async send({request, response}:HttpContextContract){
        const fullname = request.input('fullname')
        const email = request.input('email')
        const subject = request.input('subject')
        const content = request.input('message')

        await Mail.send(message => {
            message
                .from(email)
                .to('contact@gmail.com')
                .subject(subject)
                .htmlView('contact', {
                    content: content, 
                    fullname: fullname
                })
        }).then(() => {
            response.status(200).json({
                status:200, 
                message: "Tout a fonctionné"
            })
    
        }, error => {
            response.status(400).json({
                status:400, 

                message: "Erreur survenue", 
                error: error.message
            })
        })

       
        // response.redirect().toPath(this.client)

    }
}
