import {
  GroupApplication,
  GroupApplyItems,
  MustPost,
  TProfile,
} from "@/types/types";
import { promises } from "dns";

export async function getMyProfile(id: string) {
  const response = await fetch(`/api/auth/profile/${id}`);
  const data = await response.json();
  return data;
}

export async function editMyProfile(id: string, newProfile: TProfile) {
  const response = await fetch(`/api/auth/profile/${id}`, {
    method: "PUT",
    body: JSON.stringify(newProfile),
  });
  const data = await response.json();
  return data;
}

export async function uploadImage(formData: any) {
  const response = await fetch("/api/auth/profile/image", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export async function getMyGroupPosts(userId: string) {
  const response = await fetch(`/api/grouppost/user/${userId}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function editMyGroupApply(
  id: string,
  newGroupApply: GroupApplication
) {
  const response = await fetch(`/api/applygroup/${id}`, {
    method: "PUT",
    body: JSON.stringify(newGroupApply),
  });
  const data = await response.json();
  return data;
}

export async function wishItem(id: string) {
  const response = await fetch(`/api/mustpost/wish/${id}`);
  const data = await response.json();
  return data;
}

export async function myItemsPost(id: string) {
  const response = await fetch(`/api/mustpost/user/${id}`);
  const data = await response.json();
  return data;
}

export async function likeItemPage(id: string) {
  const response = await fetch(`/api/grouppost/like/user/${id}`);
  const data = await response.json();
  return data;
}

export async function applyItems(id: string) {
  const response = await fetch(`/api/grouppost/apply/${id}`);
  const data = await response.json();
  return data;
}
