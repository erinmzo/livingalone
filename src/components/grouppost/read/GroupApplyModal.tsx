import React from "react";

interface PropsType {
  onClose: () => void;
}

function GroupApplyModal({ onClose }: PropsType) {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="z-10 w-[1000px] min-h-[300px] bg-white rounded-[30px] shadow-modal-custom">
        <button onClick={onClose}>임시 엑스버튼</button>
        <h6>공구 신청하기</h6>
        <input placeholder="입금자명" />
        <input placeholder="+82" />
      </div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50"
      ></div>
    </div>
  );
}

export default GroupApplyModal;
