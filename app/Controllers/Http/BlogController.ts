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
    try {
      const thumbnail = request.file("file");
      const post = {
        name: request.input("name").trim(),
        description: request.input("description").trim(),
        slug: request.input("name").trim().split(" ").join("-").toLowercase(),
        content: request.input("content"),
        thumbnail: `${this.server}/downloads/${thumbnail?.clientName}`,
        userId: request.cookie("user").id,
      };
      await request.validate(CreatePostValidator);
      await Post.create(post);

      if (thumbnail != null) {
        await thumbnail.move(Application.tmpPath("uploads"), {
          name: post.thumbnail,
        });
      }
    } catch (error) {
      return {
        message: error.message,
      };
    }

    response.redirect().toPath(this.client);
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
