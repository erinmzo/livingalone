import Link from "next/link";

function JoinMarketing() {
  return (
    <div className="flex flex-col justify-center items-center pb-[150px]">
      <span className="text-[60px]">👑</span>
      <p className="text-[32px] text-center font-bold">
        혼자 살 때 멋진 우리!
        <br />
        멋진 우리만의 커뮤니티!
      </p>
      <Link href="/join" className="mt-[30px] px-[85px] py-[16px] bg-black text-white rounded-full text-[26px]">
        혼자살때 가입하기
      </Link>
    </div>
  );
}

export default JoinMarketing;
