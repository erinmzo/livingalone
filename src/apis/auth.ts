import { createClient } from "@/supabase/client";
export async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user?.id) {
    const userId = data.user.id as string;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profile) return data;

    if (profileError?.code === "PGRST116") {
      const { error: insertError } = await supabase.from("profiles").insert([{ user_id: userId, nickname: "혼살러" }]);
      if (insertError) return insertError.message;
    }
  }

  return data;
}

export async function login(loginData: { email: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
  return data;
}

export async function googleLogin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) return { error: "구글 로그인 실패" };

  return { error };
}
