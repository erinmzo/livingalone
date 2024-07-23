function ApplyList() {
  return (
    <div className="mt-2">
      <table className="w-full text-left">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="30%" />
          <col width="40%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr className="text-sm text-gray-400">
            <th className="p-2">순서</th>
            <th className="p-2">이름</th>
            <th className="p-2">전화번호</th>
            <th className="p-2">주소</th>
            <th className="p-2 text-center">입금여부</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm">
            <td className="p-2">숫자</td>
            <td className="p-2">이름</td>
            <td className="p-2">전화번호</td>
            <td className="p-2">주소</td>
            <td className="p-2 text-center">
              <input type="checkbox" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ApplyList;
