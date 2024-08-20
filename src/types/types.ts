import { Tables } from "./supabase";

export type Profile = Tables<"profiles">;
export type TProfile = Partial<Profile>;

export type MustPost = Tables<"must_posts">;
export type MustWish = Tables<"must_wishes">;
export type MustComment = Tables<"must_comments">;
export type MustCategory = Tables<"must_categories">;

export type MustComments = Tables<"must_comments"> & {
  profiles: Pick<Profile, "nickname" | "profile_image_url">;
} & {
  must_post: Pick<MustPost, "id" | "user_id">;
};

export type TNewMustPost = Omit<MustPost, "created_at">;

export type TMainMustPost = Pick<MustPost, "id" | "title" | "item" | "img_url">;
export type TMustPostList = Pick<MustPost, "id" | "title" | "content" | "item" | "img_url">;

export type TMustWishData = Omit<MustWish, "created_at" | "id">;

export type GroupPost = Tables<"group_posts">;
export type GroupLike = Tables<"group_likes">;
export type GroupApplication = Tables<"group_applications">;
export type GroupApplyItems = GroupApplication & { group_posts: GroupPost };

export type TNewGroupPost = Omit<GroupPost, "created_at">;
export type TNewGroupApplication = Omit<GroupApplication, "created_at">;

export type TGroupApplication = Pick<GroupApplication, "id">;
export type TGroupApplications = {
  group_applications: GroupApplication[];
};

export type TMainGroupPost = Pick<
  GroupPost,
  "id" | "title" | "price" | "people_num" | "is_finished" | "img_url" | "start_date" | "end_date"
> &
  TGroupApplications;

export type TGroupLikeData = Omit<GroupLike, "created_at" | "id">;
export type TGroupLike = Pick<GroupLike, "id">;
export type TGroupApplicationsLikes = {
  group_applications: TGroupApplication[];
  group_likes: TGroupLike[];
};

export type TPopularGroupPost = Pick<
  GroupPost,
  "id" | "title" | "price" | "people_num" | "is_finished" | "img_url" | "start_date" | "end_date"
> &
  TGroupApplicationsLikes;

export type TMyGroupPost = GroupPost & TGroupApplications;
export type TGroupLikeAndApplications = GroupPost & { group_applications: TGroupLike[] };
export type TLikePosts = Tables<"group_likes"> & { group_posts: TGroupLikeAndApplications };

export type Chat = Tables<"chat">;

export type Payment = Tables<"payments">;
export type TNewPayment = Omit<Payment, "created_at">;

export type Alarm = Tables<"alarm">;
export type TAddAlarm = Omit<Alarm, "id" | "created_at">;
export type TAlarm = Tables<"alarm"> & {
  group_posts: { title: string; img_url: string };
  must_posts: { title: string; img_url: string };
};
export type TEditAlarm = Pick<Alarm, "user_id" | "id" | "is_read">;
export type TDeleteAlarm = Pick<Alarm, "user_id" | "id">;

export type Comment = Tables<"must_comments">;
