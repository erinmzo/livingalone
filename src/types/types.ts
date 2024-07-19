import { Tables } from "./supabase";

export type Profile = Tables<"profiles">;

export type MustPost = Tables<"must_posts">;
export type MustWish = Tables<"must_wishes">;
export type MustComment = Tables<"must_comments">;
export type MustCategory = Tables<"must_categories">;

export type GroupPost = Tables<"group_posts">;
export type GroupLike = Tables<"group_likes">;
export type GroupApplication = Tables<"group_applications">;

export type TNewGroupPost = Pick<
  GroupPost,
  | "id"
  | "user_id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
  | "content"
  | "item"
  | "link"
>;
