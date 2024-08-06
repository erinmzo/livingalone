"use client";
import { getAlarms } from "@/apis/alarm";
import { TAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import AlarmItem from "./AlarmItem";

function AlarmList() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: alarms = [],
    isPending,
    isError,
  } = useQuery<TAlarm[]>({
    queryKey: ["alarm", userId],
    queryFn: () => getAlarms(userId),
    enabled: !!user,
  });

  if (isPending)
    return (
      <div className="overflow-hidden absolute right-0 top-6 border border-main-8 bg-white z-[99] text-[16px] rounded-lg w-[320px] h-[380px]">
        <h4 className="p-2 font-bold">알림</h4>
      </div>
    );

  if (isError)
    return (
      <div className="overflow-hidden absolute right-0 top-6 border border-main-8 bg-white z-[99]">
        <ul className="flex flex-col">
          <li className="text-[16px] w-[320px] py-5 px-8"> 에러</li>
        </ul>
      </div>
    );
  return (
    <div className="overflow-hidden absolute right-0 top-6 border border-main-8 bg-white z-[99] text-[16px] rounded-lg w-[320px] h-[380px] scroll-y-auto">
      <h4 className="p-2 font-bold">알림</h4>
      {alarms.length > 0 ? (
        <ul className="flex flex-col justify-start">
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              <AlarmItem alarm={alarm} userId={userId} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-[320px] h-[300px] justify-center items-center">알람이 없습니다.</div>
      )}
    </div>
  );
}

export default AlarmList;
