import { TComment } from "@/components/mustpost/comments/CommentForm";
import { TEditComment } from "@/components/mustpost/comments/CommentsList";
import { createClient } from "@/supabase/client";
import { MustPost, TMustWishData, TNewMustPost } from "@/types/types";

export async function getMustPostOnMain() {
  const response = await fetch("/api/main/must", {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getMustPostOnSearch() {
  const response = await fetch(`/api/mustpost/search`);
  const data = await response.json();
  return data;
}

export async function getMustPostAll(page = 0) {
  const response = await fetch(`/api/mustpost?page=${page}`);
  const data = await response.json();
  return {
    posts: data.data,
    total: data.count,
  };
}

export async function getCategories() {
  const response = await fetch("/api/category");
  const data = await response.json();
  return data;
}

export async function getMustPostbyCategory(page = 0, categoryId: string) {
  const response = await fetch(
    `/api/mustpost/category/${categoryId}?page=${page}`
  );
  const data = await response.json();
  return {
    posts: data.data,
    total: data.count,
  };
}

export async function getMustPostDetail(id: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("must_posts")
    .select("*, profiles(nickname, profile_image_url), must_categories(name)")
    .eq("id", id)
    .single();
  return data;
}

export async function getMyWish(userId: string, postId: string) {
  const response = await fetch(`/api/mustpost/wish/${userId}/${postId}`);
  const data = await response.json();
  return data;
}

export async function insertWish(wishData: TMustWishData) {
  await fetch("/api/mustpost/wish", {
    method: "POST",
    body: JSON.stringify(wishData),
  });
}

export async function deleteWish(wishData: TMustWishData) {
  await fetch("/api/mustpost/wish", {
    method: "DELETE",
    body: JSON.stringify(wishData),
  });
}

export async function insertMustImage(formData: any) {
  const response = await fetch("/api/mustpost/image", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export async function insertMustPost(newMustPost: TNewMustPost) {
  await fetch("/api/mustpost", {
    method: "POST",
    body: JSON.stringify(newMustPost),
  });
}

export async function deleteMustPost(id: string): Promise<void> {
  await fetch(`/api/mustpost/${id}`, {
    method: "DELETE",
  });
}

export async function getMustPost(id: string) {
  const response = await fetch(`/api/mustpost/${id}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function updateMustPost(newMustPost: TNewMustPost) {
  await fetch(`/api/mustpost/${newMustPost.id}`, {
    method: "PUT",
    body: JSON.stringify(newMustPost),
  });
}

export async function NewMustCategoryPost(
  postCategoryId: string,
  postId: string
) {
  const supabase = createClient();
  const { data } = await supabase
    .from("must_posts")
    .select("*")
    .eq("category_id", postCategoryId)
    .neq("id", postId)
    .order("created_at", { ascending: false })
    .limit(3);
  return data;
}

export async function getComments(postId: string) {
  const response = await fetch(`/api/mustpost/comments/${postId}`);
  const data = await response.json();
  // console.log("데이터", data);
  return data;
}

export async function insertComment(newComment: TComment) {
  const response = await fetch(`/api/mustpost/comments`, {
    method: "POST",
    body: JSON.stringify(newComment),
  });

  const data = await response.json();
  return data;
}

export async function deleteMustComment(commentId: string) {
  await fetch(`/api/mustpost/comments`, {
    method: "DELETE",
    body: JSON.stringify(commentId),
  });
}

export async function updatenewComment(newEditComment: TEditComment) {
  await fetch(`/api/mustpost/comments`, {
    method: "PUT",
    body: JSON.stringify(newEditComment),
  });
}
