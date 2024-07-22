function SideBar() {
  return (
    <div className="flex flex-col w-[200px] h-[500px] items-center p-4 border border-gray-400 rounded-lg bg-white">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
      <div className="text-lg font-semibold mb-4">나는공구왕</div>
      <div className="w-full flex-col justify-center items-center ">
        <h2 className="text-md font-bold mb-2">나의 정보</h2>
        <ul className="text-gray-600 space-y-2">
          <li>찜한 자취템</li>
          <li>나의 자취템</li>
          <li>좋아요 공구</li>
          <li>신청받은 공구</li>
          <li>내가 쓴 공구</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
