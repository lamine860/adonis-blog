/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "HomeController.index").as("home");

Route.group(() => {
  Route.get("/posts/create", "PostsController.create").as("posts.create");
  Route.get("/posts", "PostsController.index").as("posts.index");
  Route.post("/posts", "PostsController.store").as("posts.store");
  Route.put("/posts/:id", "PostsController.update").as("posts.update");
  Route.delete("/posts/:id", "PostsController.destroy").as("posts.destroy");
  Route.get("/posts/:id/edit", "PostsController.edit").as("posts.edit");
}).middleware("auth");
Route.get("/posts/:id", "PostsController.show").as("posts.show");

Route.resource("posts/comments", "CommentsController").only([
  "store",
  "destroy",
]);

// Route.resource("posts", "PostsController");
Route.get("/users/login", "UsersController.login");
Route.post("/users/login", "UsersController.login");
Route.get("/users/register", "UsersController.register");
Route.post("/users/register", "UsersController.register");
Route.post("/users/logout", "UsersController.logout");
