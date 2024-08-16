const SkeletonProfile = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8 md:gap-0 p-4 md:p-0">
      <div className="flex flex-col justify-center items-center mb-8 mt-8 md:mt-0 md:block ">
        <div className=" bg-gray-2 md:rounded md:mt-0 border rounded-full w-[76px] h-[30px] md:w-[115px] md:h-[29px]"></div>
        <div className="border border-gray-2 bg-gray-2 rounded-full mb-4 mt-8 md:hidden w-[100px] h-[100px]"></div>
        <div className="border border-gray-2 bg-gray-2 text-[16px] w-[100px] rounded font-bold md:hidden text-center h-[19px]"></div>
      </div>
      <div className="flex flex-col items-center w-full md:w-auto">
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-[32px]">
          <div className="w-full">
            <div className="h-10 bg-gray-2 rounded"></div>
          </div>
          <div className="w-full">
            <div className="h-10 bg-gray-2 rounded"></div>
          </div>
        </div>
        <div className="relative mt-16 flex flex-col w-full">
          <div className="flex gap-3 w-fit py-2 px-4 border border-gray-3 bg-white font-bold rounded-full md:mb-3 mb-2 justify-center items-center">
            <span className="text-center text-[12px] text-gray-400 md:text-[16px]">주소검색</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-gray-2 rounded"></div>
            <div className="h-10 bg-gray-2 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-2 w-full md:w-[500px] h-[52px] text-white py-2 mt-[50px] rounded-full font-bold text-[16px] md:text-[18px]"></div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
