function AlarmList() {
  return (
    <div className="absolute right-0 top-6 border border-main-8 bg-white z-[99]">
      <ul className="flex flex-col">
        <li className="text-[16px] w-[320px] py-5 px-8 bg-yellow-1">
          <span className="block font-bold text-main-7 w-[200px] truncate">
            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </span>
          해당 게시글에 메세지가 왔습니다.
        </li>
        <li className="text-[16px]  w-[320px] py-5 px-8 bg-white">
          <span className="block font-bold text-main-7 w-[200px] truncate">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span>해당 게시글에
          공구 신청이 왔습니다.
        </li>
        <li className="text-[16px]  w-[320px] py-5 px-8 bg-white">
          <span className="block font-bold text-main-7 w-[200px] truncate">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span>해당 게시글에
          댓글이 달렸습니다.
        </li>
        <li className="text-[16px]  w-[320px] py-5 px-8 bg-white">
          <span className="block font-bold text-main-7 w-[200px] truncate">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span>해당 게시글에
          공구 인원이 마감되었습니다.
        </li>
      </ul>
    </div>
  );
}

export default AlarmList;
