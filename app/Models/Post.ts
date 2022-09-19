import { DateTime } from "luxon";
import {
  afterFetch,
  afterFind,
  afterUpdate,
  BaseModel,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Driver from "@ioc:Adonis/Core/Drive";
import Comment from "./Comment";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public image: string | null;

  @column()
  public body: string;

  @column()
  public published: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  public imageUrl: string;

  @afterFetch()
  public static async fetchPost(posts: Post[]) {
    posts.forEach(async (post: Post) => {
      post.imageUrl = post.image ? await Driver.getUrl(post.image) : "";
    });
  }
  @afterFind()
  public static async findPost(post: Post) {
    post.imageUrl = post.image ? await Driver.getUrl(post.image) : "";
  }
  @afterUpdate()
  public static async savePost(post: Post) {
    post.imageUrl = post.image ? await Driver.getUrl(post.image) : "";
  }
}
