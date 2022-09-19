import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all();
    return view.render("posts/index", { posts });
  }
  public async edit({ view, request }: HttpContextContract) {
    const { id } = request.params();
    const post = await Post.findOrFail(id);
    return view.render("posts/edit", { post });
  }
  public async create({ view }: HttpContextContract) {
    return view.render("posts/create");
  }

  public async show({ request, view }: HttpContextContract) {
    const { id } = request.params();
    const post = await Post.query()
      .preload("comments", (builder) => builder.orderBy("createdAt", "desc"))
      .where("id", id)
      .firstOrFail();
    return view.render("posts/show", { post: post });
  }
  public async update({ request, response, session }: HttpContextContract) {
    console.log(request.body());
    const { id } = request.params();
    const post = await Post.findOrFail(id);
    post.title = request.input("title");
    post.published = request.input("published") === "on" ? true : false;
    post.body = request.input("body");
    const image = request.file("image");
    if (image !== null) {
      await image.moveToDisk("posts/");
      post.image = `posts/${image.fileName}`;
    }
    await post.save();
    session.flash("success", "Post updated successfully");
    return response.redirect().toRoute("posts.edit", post);
  }
  public async store({ request, response, session }: HttpContextContract) {
    const post = new Post();
    post.title = request.input("title");
    post.published = request.input("published") === "on" ? true : false;
    post.body = request.input("body");
    const image = request.file("image");
    if (image !== null) {
      await image.moveToDisk("posts");
      post.image = `posts/${image.fileName}`;
    }
    await post.save();
    session.flash("success", "Post created successfully");
    return response.redirect().toRoute("home");
  }
  public async destroy({ request, response, session }: HttpContextContract) {
    const { id } = request.params();
    const post = await Post.findOrFail(id);
    await post.delete();
    session.flash("success", "Post deleted successfully");
    return response.redirect().toRoute("posts.index");
  }
}
