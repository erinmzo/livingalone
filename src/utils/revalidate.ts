"use server";

import { revalidatePath } from "next/cache";

export async function postRevalidate(url: string) {
  revalidatePath(url);
}
