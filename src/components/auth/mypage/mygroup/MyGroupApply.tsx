"use client";

import React, { useState } from "react";

function MyGroupApply({ groupApply, idx }: { groupApply: any; idx: number }) {
  console.log(groupApply);
  console.log(idx);
  const [isPaid, setIsPaid] = useState(groupApply.is_paid);

  const paidGroupApplyHandler = async () => {
    console.log(groupApply);
    const newGroupApply = {
      ...groupApply,
      is_paid: !isPaid,
    };
    setIsPaid(!isPaid);

    console.log(newGroupApply.is_paid);
  };

  return (
    <>
      <td className="p-2">{idx + 1}</td>
      <td className="p-2">{groupApply.user_name}</td>
      <td className="p-2">{groupApply.user_phone}</td>
      <td className="p-2">
        {groupApply.user_address} {groupApply.user_detail_address}
      </td>
      <td className="p-2 text-center">
        {groupApply.is_paid ? (
          <input onChange={paidGroupApplyHandler} type="checkbox" checked />
        ) : (
          <input onChange={paidGroupApplyHandler} type="checkbox" />
        )}
      </td>
    </>
  );
}

export default MyGroupApply;
