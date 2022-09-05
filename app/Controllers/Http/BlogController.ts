import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import Post from "App/Models/Post";
import Drive from "@ioc:Adonis/Core/Drive";
import CreatePostValidator from "App/Validators/CreatePostValidator";

export default class BlogController {
  client = "http://127.0.0.1:3000";
  server = "http://127.0.0.1:3333";
  
  public async createPost({ request, response }: HttpContextContract) {

    // le cookie utilisateur
    const userCookie = request.cookiesList().user
    const userId = JSON.parse(atob(userCookie)).message.id
    console.log("cookie utilisateur", atob(userCookie));
    try {
      const thumbnail = request.file("file");

      if(userId != undefined){
        const post = {
          name: request.input("name").trim(),
          description: request.input("description").trim(),
          slug: request.input("name").trim().split(" ").join("-"),
          content: request.input("content"),
          thumbnail: thumbnail == null ? 'https://picsum.photos/id/237/536/354': `${this.server}/downloads/${thumbnail?.clientName}`,
          userId: userId,
        };
        await request.validate(CreatePostValidator);

        // créer le post et renvoyer un status 200 
        await Post.create(post).then(
          () => {
            return response.status(200).json({
              status: 200, 
              message: "Post crée"
            });
          }
        );
  
        if (thumbnail != null) {
          await thumbnail.move(Application.tmpPath("uploads"), {
            name: post.thumbnail,
          });
        }
      }
      // si l'utilisateur n'existe pas, on lui dit de se connecter pour envooyer un post
      else {
        return response.status(409).json({
          status: 409, 
          message: "Connectez vous pour poster"
        })
      }
      
    } catch (error) {

      // Erreur
      return response.status(400).json({
        status: 400, 
        message: "Erreur survenue", 
        error: error
      })
    }

    // response.redirect().toPath(this.client);
  }

  public async addComment({ request, response }: HttpContextContract) {
    const comment = {
      message: request.input("message"),
      userId: JSON.parse(atob(request.input("userId"))).message.id,
        postId: request.input("postId")
    };

    // console.log("voici le commentairecd qui eest envoyé", comment);

    try {
      await Comment.create(comment).then(() => {
        // console.log("tout s'est bien passé", data)
        response.status(200).json({
          message: comment.message,
          status: "Commentaire bien envoyé"
        });
      });
    } catch (error) {
      response.status(401).json({
        error: "Erreur lors  de l'envoi du formulaire",
      });
    }

    // response.redirect().toPath(`${this.client}/${params.id}`)
  }

  public async download({ params, response }: HttpContextContract) {
    const imgPath = `${params.fileName}`;
    const isExist = await Drive.exists(imgPath);

    if (isExist) {
      return response.download(
        `${Application.tmpPath("uploads")}/${params.fileName}`
      );
    }

    return {
      error: "Ce fichier n'existe pas sur le serveur",
    };
  }
}
