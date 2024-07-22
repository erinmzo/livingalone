import Input from "../Input";
import Button from "../button/Button";

function MyInformation() {
  return (
    <div className="flex-col w-auto grow">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col gap-6 ">
          <span>나의 정보</span>
          <div>
            <span>닉네임</span>
            <Input variant="default" />
          </div>
          <div>
            <span>프로필 사진변경</span>
            <Input variant="default" type="file" placeholder="사진변경" />
          </div>
          <div>
            <Button variant="primary">주소변경</Button>
            <Input variant="underline" />
          </div>
          <Button variant="secondary">개인정보 변경완료</Button>
        </div>
      </div>
    </div>
  );
}
export default MyInformation;
