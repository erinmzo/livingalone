"use server";

import { revalidatePath } from "next/cache";

export async function groupPostRevalidate(id: string) {
  revalidatePath(`/grouppost/read/${id}`);
}

export async function mustPostRevalidate(id: string) {
  revalidatePath(`/mustpost/read/${id}`);
}
