import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import Post from "App/Models/Post";
import Drive from "@ioc:Adonis/Core/Drive";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import User from "App/Models/User";
import Env from '@ioc:Adonis/Core/Env'
export default class BlogController {
  server = Env.get("SERVER_URL");

  //  créer un post
  public async createPost({ request, response }: HttpContextContract) {
    // le cookie utilisateur
    const userInfo = JSON.parse(request.headers().authorization?.split(" ")[1] || "null");
    const userId = userInfo !=null? userInfo.id : null ;

    // console.log("voici la requete", request.headers())
    // console.log("les entêtes", userInfo)

    try {
      const thumbnail = request.file("file");

      if (userId != null) {
        const post = {
          name: request.input("name").trim(),
          description: request.input("description").trim(),
          slug: request.input("name").trim().split(" ").join("-"),
          content: request.input("content"),
          thumbnail:
            thumbnail == null
              ? "https://picsum.photos/id/237/536/354"
              : `${this.server}/downloads/${thumbnail?.clientName}`,
          userId: userId,
        };
        await request.validate(CreatePostValidator);

        // créer le post et renvoyer un status 200
        await Post.create(post).then(() => {
          return response.status(200).json({
            status: 200,
            message: "Post crée",
          });
        });

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
          message: "Connectez vous pour poster",
        });
      }
    } catch (error) {
      // Erreur
      return response.status(400).json({
        status: 400,
        message: "Erreur survenue",
        error: error.message,
      });
    }

    // response.redirect().toPath(this.client);
  }

  // retourner un post en particulier
  public async retrieveOnePost({ request, response }: HttpContextContract) {
    // console.log("les paramètres", request.param("id") )
    console.log("je suis bien la fonction pour récupérer un post", request.param("id"))
    await Post.findOrFail(request.param("id")).then(
      (data) => {
        return response.status(200).json(data);
      },
      (error) => {
        return response.status(400).json({
          status: 400,
          message: "L'id ne correspond à aucun post",
          error: error.message,
        });
      }
    );
  }

  // modifier un post 
  public async updatePost({request, response}:HttpContextContract){
    const userInfo = JSON.parse(request.headers().authorization?.split(" ")[1] || "null");
    const userId = userInfo !=null? userInfo.id : null;
    let retrievePost; 

    // récupérer le post et lui appliquer des actions
     await Post.findOrFail(request.param("id")).then(async data => {
      retrievePost = data

      try{
        const thumbnail = request.file("file");
  
        //  si l'utilisateur existe et que c'est son post alors il peut le modifier
        if(userId != null && userId == retrievePost.userId){
          const post = {
            name: request.input("name"), 
            description: request.input("description"), 
            content: request.input("content"), 
            thumbnail: 
            thumbnail == null
              ? "https://picsum.photos/id/237/536/354"
              : `${this.server}/downloads/${thumbnail?.clientName}`,
              userId: userId
          }
          // console.log("le nouveau post modifié", post)
          await request.validate(CreatePostValidator).then(
            async ()=> {

              await retrievePost.merge(post).save()
              return response.status(200).json({
                status: 200, 
                message: "Post modifié"
              });
            }, 
            (error) =>{
              return response.status(409).json({
                status: 409, 
                message: "Informations non valides", 
                error: error
              })
            }
          )
        }

        // si l'utilisateur n'est pas connecté ou que celui n'est pas lui l'auteur du post
        else {
          return response.status(401).json({
            status: 401, 
            message: "Vous ne pouvez pas modifier cette ressource"
          })
        }
        
      }catch(error){
        return response.status(400).json({
          status: 400, 
          message: "Erreur survenue lors de la modification du post", 
          error: error.message
        })
      }
     }, error => {
      return response.status(422).json({
        status: 422, 
        message: "Ce post n'existe pas", 
        error: error.message
      })
     })

    
    
  }

  // supprimer un post
  public async deletePost({ request, response }: HttpContextContract) {
    const userInfo = JSON.parse(request.headers().authorization?.split(" ")[1] || "null");
    const userId = userInfo !=null? userInfo.id : null;
    await Post.findOrFail(request.param("id")).then(
      async (data) => {

        //  si l'utilisateur existe et que c'est son post alors il peut le supprimer
        if(userId != null && userId == data.userId){

            try {
              await data.delete()
              return response.status(200).json({
                status: 200, 
                message: "Post supprimé"
              });
            } catch (error) {
              // console.log("je suis fou", error.message)
              return response.status(500).json({
                status: 500, 
                message: "Erreur lors de la suppression du post", 
                error: error.message
              });
            }
          
        }

        // sinon , on lui dit qu'il n'a pas l'autorisation
        else {
          return response.status(401).json({
            status: 401, 
            message: "Vous n'êtes autorisé à supprimer cette ressource"
          })
        }
        
      },
      (error) => {
        return response.status(400).json({
          status: 400,
          message: "L'id ne correspond à aucun post",
          error: error.message,
        });
      }
    );
  }
  
  // retourner un commentaire
  public async retrieveOneComment({ request, response }: HttpContextContract) {
    // console.log("les paramètres", request.param("id") )
    await Comment.findOrFail(request.param("id")).then(
      (data) => {
        return response.status(200).json(data);
      },
      (error) => {
        return response.status(400).json({
          status: 400,
          message: "L'id ne correspond à aucun commentaire",
          error: error.message,
        });
      }
    );
  }

  //  retourner un utilisateur en particulier
  public async retrieveOneUser({ request, response }: HttpContextContract) {
    // console.log("les paramètres", request.param("id") )
    await User.findOrFail(request.param("id")).then(
      (data) => {
        return response.status(200).json(data)
      },
      (error) => {
        return response.status(400).json({
          status: 400,
          message: "L'id ne correspond à aucun utilisateur",
          error: error.message,
        });
      }
    );
  }

  // ajouter un commentaire sous un post
  public async addComment({ request, response }: HttpContextContract) {
    // le cookie utilisateur
    const userInfo = JSON.parse(request.headers().authorization?.split(" ")[1] || "null");
    // console.log("cookie utilisateur", userCookie)

    if (userInfo != null) {
      const userId = userInfo.id; 
      const comment = {
        message: request.input("message"),
        userId: userId,
        postId: request.input("postId"),
      };

      //  console.log("voici le cookie utilisateur", userCookie)
      //    console.log("voici le commentairecd qui eest envoyé", comment);

      try {
        await Comment.create(comment);
        // console.log("tout s'est bien passé", data)
        response.status(200).json({
          status: 200,
          message: "Commentaire bien envoyé",
        });
      } catch (error) {
        response.status(400).json({
          status: 400,
          message: "Erreur lors  de l'envoi du formulaire",
          error: error.message,
        });
      }
    } else {
      return response.status(409).json({
        status: 409,
        message: "Connectez vous pour envoyer un message",
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
