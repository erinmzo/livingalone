"use client";
import Image from "next/image";

function TopButton() {
  const topBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={topBtn}
      className="inline-flex justify-center items-center
        btn-fixed-right"
    >
      <Image
        src="/img/icon-top-button.svg"
        alt="top 스크롤 버튼"
        width={40}
        height={40}
      />
    </button>
  );
}

export default TopButton;

// 질문할것
// - 1.일단 지금은 컴포넌트 아래쪽으로 둬서 누르면 올라가게끔 만들어놨는데 이걸 의도한게 맞을지
// 2. 아니면 전체 스크롤에 따라붙을것인지
// 일단 1이 맞다면 sticky로 해도 괜찮기 때문에 그대로 가야하고 2가 맞다면 fixed로 바꿔야함 ㅠㅠ
