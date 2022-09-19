import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async login({ request, auth, view, response }: HttpContextContract) {
    if (request.method() === "POST") {
      const { email, password } = request.body();
      await auth.use("web").attempt(email, password);
      return response.redirect().toRoute("home");
    } else {
      return view.render("users/login");
    }
  }
  public async register({ request, view, response }: HttpContextContract) {
    if (request.method() === "POST") {
      const { email, password } = request.body();
      const user = new User();
      user.email = email;
      user.password = password;
      await user.save();
      return response.redirect().toRoute("UsersController.login");
    } else {
      return view.render("users/register");
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    auth.logout();
    return response.redirect().toRoute("home");
  }
}
