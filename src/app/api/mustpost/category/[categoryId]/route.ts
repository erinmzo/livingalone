import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const itemsPerPage = 3;
  const offset = page * itemsPerPage;

  try {
    const supabase = createClient();
    const { data, count } = await supabase
      .from("must_posts")
      .select("id, title, item, img_url", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .eq("category_id", categoryId)
      .range(offset, offset + itemsPerPage - 1);
    return NextResponse.json({ data, count });
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
