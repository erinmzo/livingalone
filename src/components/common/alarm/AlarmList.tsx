"use client";
import { TAlarm } from "@/types/types";
import AlarmItem from "./AlarmItem";

function AlarmList({ alarms, userId }: { alarms: TAlarm[]; userId: string }) {
  return (
    <div className="overflow-hidden absolute right-0 top-[36px] border border-gray-4 bg-white text-[16px] rounded-lg w-[300px] md:w-[340px] p-[18px] z-[99] overflow-y-scroll max-h-[396px]">
      {alarms.length > 0 ? (
        <ul className="flex flex-col justify-start gap-2 ">
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              <AlarmItem alarm={alarm} userId={userId} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-[300px] md:w-[340px h-[110px] justify-center items-center text-[14px]">
          알람이 없습니다.
        </div>
      )}
    </div>
  );
}

export default AlarmList;
