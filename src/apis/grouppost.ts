import { TNewGroupApplication, TNewGroupPost } from "@/types/types";

export async function getGroupPostOnMain() {
  const response = await fetch("/api/main/group", { next: { revalidate: 60 } });
  const data = await response.json();
  return data;
}

export async function getGroupPost(isFinished: boolean) {
  const response = await fetch(`/api/grouppost?isFinished=${isFinished}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
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
