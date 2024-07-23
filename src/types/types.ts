import { Tables } from "./supabase";

export type Profile = Tables<"profiles">;

export type MustPost = Tables<"must_posts">;
export type MustWish = Tables<"must_wishes">;
export type MustComment = Tables<"must_comments">;
export type MustCategory = Tables<"must_categories">;

export type TMainMustPost = Pick<MustPost, "id" | "title" | "item" | "img_url">;
export type TMustPostList = Pick<MustPost, "id" | "title" | "content" | "item" | "img_url">;

export type GroupPost = Tables<"group_posts">;
export type GroupLike = Tables<"group_likes">;
export type GroupApplication = Tables<"group_applications">;

export type TNewGroupPost = Omit<GroupPost, "created_at">;
export type TNewGroupApplication = Omit<GroupApplication, "created_at">;
