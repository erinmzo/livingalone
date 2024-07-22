import Page from "@/components/common/Page/Page";
import React from "react";
import Input from "../Input";
import SideBar from "../sideBar/Sidebar";
import Button from "../button/Button";

function MyInformationPage() {
  return (
    <Page>
      <div className="flex-col">
        <h1 className="text-3xl text-center font-bold mb-20">마이페이지</h1>
        <div className="flex justify-center items-cente space-x-40">
          <SideBar />
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
    </Page>
  );
}
export default MyInformationPage;
