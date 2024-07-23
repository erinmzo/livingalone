import Input from "../Input";
import Button from "../button/Button";
import searchWhite from "../../../../public/img/SearchWhite.png";
import Image from "next/image";

function MyInformation() {
  return (
    <div className="flex-col w-auto grow">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col w-[422px] h-[508px] gap-6 ">
          <span className="text-lg font-medium">나의 정보</span>
          <div>
            <span>닉네임</span>
            <Input variant="default" />
          </div>
          <div>
            <span>프로필 사진변경</span>
            <Input variant="default" type="file" placeholder="사진변경" />
          </div>
          <div>
            <Button variant="primary" className="flex items-center gap-3">
              <Image src={searchWhite} alt="이미지" width={20} height={20} />
              <p>주소변경</p>
            </Button>
            <Input variant="underline" />
            <Input variant="underline" />
          </div>
          <Button variant="secondary">변경하기</Button>
        </div>
      </div>
    </div>
  );
}
export default MyInformation;
