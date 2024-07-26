import { createClient } from "@/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Supabase 세션을 가져오기
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("세션 가져오기 오류:", error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!session) {
    console.log("사용자가 로그인되지 않았습니다.");
    return res.status(401).json({ error: "사용자가 로그인되지 않았습니다." });
  }

  // 세션이 존재하면 홈으로 리다이렉트
  res.redirect("/");
}
