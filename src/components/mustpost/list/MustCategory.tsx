"use client";
import { getCategories, getMustPostOnMain } from "@/apis/mustpost";
import type { MustCategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function MustCategory() {
  const {
    data: mustCategories,
    isPending,
    isError,
  } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });
  console.log(mustCategories);
  return (
    <div>
      <ul className="flex flex-row gap-3">
        <li className="py-2 px-4 border border-black rounded-full ">ALL</li>
        {mustCategories?.map((category) => (
          <li
            key={category.id}
            className="py-2 px-4 border border-black rounded-full"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MustCategory;
