import { GroupPost, TNewGroupPost } from "@/types/types";

export async function getGroupPostOnMain() {
  const response = await fetch("/api/grouppost", { next: { revalidate: 60 } });
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
