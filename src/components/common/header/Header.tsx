import Link from "next/link";
import AuthHeader from "./AuthHeader";
import GlobalNav from "./GlobalNav";
import WriteButton from "./WriteButton";

function Header() {
  return (
    <header>
      <AuthHeader />
      <div className="container mx-auto max-w-[1024px] flex justify-between items-center py-[18px]">
        <h1 className="text-[30px] font-extrabold">
          <Link href="/">혼자살때</Link>
        </h1>
        <div className="flex items-center">
          <GlobalNav />
          <WriteButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
