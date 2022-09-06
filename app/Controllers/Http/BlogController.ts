import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import Post from "App/Models/Post";
import Drive from "@ioc:Adonis/Core/Drive";
import CreatePostValidator from "App/Validators/CreatePostValidator";
import User from "App/Models/User";

export default class BlogController {
  client = "http://127.0.0.1:3000";
  server = "http://127.0.0.1:3333";

  //  créer un post
  public async createPost({ request, response }: HttpContextContract) {
    // le cookie utilisateur
    const userCookie = request.cookiesList().user;
    const userId = JSON.parse(atob(userCookie)).message.id;
    // console.log("cookie utilisateur", atob(userCookie));
    try {
      const thumbnail = request.file("file");

      if (userId != undefined) {
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
    await Post.findOrFail(request.param("id")).then(
      (data) => {
        return data;
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
  public async retrieveOneUser({ request, response }: HttpContextContract) {
    // console.log("les paramètres", request.param("id") )
    await User.findOrFail(request.param("id")).then(
      (data) => {
        return data;
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
    const userCookie = request.cookiesList().user;
    // console.log("cookie utilisateur", userCookie)

    if (userCookie != undefined) {
      const userId = JSON.parse(atob(userCookie)).message.id;
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
