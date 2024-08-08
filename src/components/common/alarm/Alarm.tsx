"use client";
import { getAlarms } from "@/apis/alarm";
import { TAlarm } from "@/types/types";
import { useIsAlarm } from "@/zustand/alarmStore";
import { useAuthStore } from "@/zustand/authStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AlarmList from "./AlarmList";

function Alarm() {
  const { isOpenAlarm, setIsOpenAlarm } = useIsOpen();
  const isAlarm = useIsAlarm((state) => state.isAlarm);

  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const setIsAlarm = useIsAlarm((state) => state.setIsAlarm);

  const {
    data: alarms = [],
    isPending,
    isError,
  } = useQuery<TAlarm[]>({
    queryKey: ["alarm", userId],
    queryFn: () => getAlarms(userId),
    enabled: !!user,
  });

  useEffect(() => {
    const noReadAlarm = alarms.find((alarm) => alarm.is_read === false);
    if (noReadAlarm) {
      setIsAlarm(true);
    } else {
      setIsAlarm(false);
    }
  }, [alarms, isAlarm]);

  if (isPending) return <li>알람</li>;

  if (isError) return <li>오류</li>;

  return (
    <li className="relative">
      <button onClick={() => setIsOpenAlarm(!isOpenAlarm)} className="flex gap-1">
        알람
        {isAlarm && <span className="block w-1 h-1 bg-red-3 rounded-full"></span>}
      </button>
      {isOpenAlarm && <AlarmList alarms={alarms} userId={userId} />}
    </li>
  );
}

export default Alarm;
