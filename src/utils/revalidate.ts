"use server";

import { revalidatePath } from "next/cache";

export async function groupPostRevalidate(id: string) {
  revalidatePath(`/grouppost/read/${id}`);
}
