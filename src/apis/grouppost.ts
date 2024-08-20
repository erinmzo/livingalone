import { createClient } from "@/supabase/client";
import {
  TGroupLikeData,
  TNewGroupApplication,
  TNewGroupPost,
} from "@/types/types";

export async function getGroupPostOnMain() {
  const response = await fetch("/api/main/group", {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getGroupPosts(page = 0, isFinished: boolean) {
  const response = await fetch(
    `/api/grouppost?page=${page}&isFinished=${isFinished}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return {
    posts: data.data,
    total: data.count,
  };
}

export async function getGroupPostsOnDetail() {
  const response = await fetch("/api/grouppost/read", {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getGroupPost(id: string) {
  const response = await fetch(`/api/grouppost/${id}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getGroupDetail(id: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("group_posts")
    .select("*, profiles(nickname, profile_image_url), group_applications(id)")
    .eq("id", id)
    .single();
  return data;
}

export async function insertGroupImage(formData: FormData) {
  const response = await fetch("/api/grouppost/image", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export async function insertGroupPost(newGroupPost: TNewGroupPost) {
  await fetch("/api/grouppost", {
    method: "POST",
    body: JSON.stringify(newGroupPost),
  });
}

export async function updateGroupPost(newGroupPost: TNewGroupPost) {
  await fetch(`/api/grouppost/${newGroupPost.id}`, {
    method: "PUT",
    body: JSON.stringify(newGroupPost),
  });
}

export async function deleteGroupPost(id: string): Promise<void> {
  await fetch(`/api/grouppost/${id}`, {
    method: "DELETE",
  });
}

export async function insertGroupApply(newGroupApply: TNewGroupApplication) {
  await fetch("/api/applygroup", {
    method: "POST",
    body: JSON.stringify(newGroupApply),
  });
}

export async function getLikes(postId: string) {
  const response = await fetch(`/api/grouppost/like/${postId}`);
  const data = await response.json();
  return data;
}

export async function getMyLike(postId: string, userId: string) {
  const response = await fetch(`/api/grouppost/like/${postId}/${userId}`);
  const data = await response.json();
  return data;
}

export async function insertLike(likeData: TGroupLikeData) {
  await fetch("/api/grouppost/like", {
    method: "POST",
    body: JSON.stringify(likeData),
  });
}

export async function deleteLike(likeData: TGroupLikeData) {
  await fetch("/api/grouppost/like", {
    method: "DELETE",
    body: JSON.stringify(likeData),
  });
}
