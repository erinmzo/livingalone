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
  };
  return (
    <form className="flex flex-row w-[420px] mb-5 py-[10px] px-2 border-b-2 border-black" onSubmit={handleSearch}>
      <Image src="/img/search.png" alt="검색버튼" width={29} height={32} />
      <input
        type="text"
        placeholder="#여름필수템"
        className="ml-5"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
