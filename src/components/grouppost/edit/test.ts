"use server";

import { revalidatePath } from "next/cache";

export async function test() {
  revalidatePath("/grouppost/read/a4c2a12e-49fd-451d-9409-a334b646b214");
}
