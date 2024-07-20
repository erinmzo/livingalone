import { TNewGroupPost } from "@/types/types";

export async function getGroupPostOnMain() {
  const response = await fetch("/api/main/group", { next: { revalidate: 60 } });
  const data = await response.json();
  return data;
}

export async function insertGroupPost(newGroupPost: TNewGroupPost) {
  console.log(newGroupPost);
  const response = await fetch("/api/grouppost", {
    method: "POST",
    body: JSON.stringify(newGroupPost),
  });
  const data = await response.json();
  return data;
}
