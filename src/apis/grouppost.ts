import { createClient } from "@/supabase/client";
import { TNewGroupApplication, TNewGroupPost } from "@/types/types";

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

export async function insertGroupImage(formData: any) {
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

export async function deleteGroupPost(id: string) {
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
