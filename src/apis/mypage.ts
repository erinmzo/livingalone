import { TProfile } from "@/types/types";

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
  console.log(userId);
  const response = await fetch(`/api/grouppost/user/${userId}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
