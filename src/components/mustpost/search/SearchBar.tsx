"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/mustpost/search?search=${searchValue}`);
    setSearchValue("");
  };
  return (
    <form
      className="flex flex-row w-full md:w-[420px] mb-4 md:mb-6 py-[7px] px-4 border border-gray-5 rounded-full"
      onSubmit={handleSearch}
    >
      <Image src="/img/icon-search.svg" alt="검색버튼" width={36} height={24} />
      <input
        type="text"
        placeholder="자취 꿀템"
        className="ml-3 text-[16px] md:text-xl text-gray-4 placeholder:text-gray-2 outline-none"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
