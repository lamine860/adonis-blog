import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {
    const postId = request.qs().post;
    const { username, body } = request.body();
    const post = await Post.query().where("id", postId).firstOrFail();
    await post.related("comments").create({
      username: username,
      body: body,
    });
    return response.redirect().back();
  }
}
