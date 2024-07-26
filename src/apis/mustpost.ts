import { createClient } from "@/supabase/client";
import { MustPost, TMustWishData, TNewMustPost } from "@/types/types";

export async function getMustPostOnMain() {
  const response = await fetch("/api/main/must", {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getMustPostAll() {
  const response = await fetch("/api/mustpost");
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch("/api/category");
  const data = await response.json();
  return data;
}

export async function getMustPostbyCategory(categoryId: string) {
  const response = await fetch(`/api/mustpost/category/${categoryId}`);
  const data = await response.json();
  return data;
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
