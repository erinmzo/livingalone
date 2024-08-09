"use client";
import { getAlarms } from "@/apis/alarm";
import { TAlarm } from "@/types/types";
import { useIsAlarm } from "@/zustand/alarmStore";
import { useAuthStore } from "@/zustand/authStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  if (isPending)
    return (
      <div>
        <Image src="/img/icon-alarm.svg" alt="알람" width={24} height={24} />
      </div>
    );

  if (isError) return <div>오류</div>;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpenAlarm(!isOpenAlarm)}
        className="flex gap-1"
      >
        <Image src="/img/icon-alarm.svg" alt="알람" width={24} height={24} />
        {isAlarm && (
          <span className="block w-1 h-1 bg-red-3 rounded-full"></span>
        )}
      </button>
      {isOpenAlarm && <AlarmList alarms={alarms} userId={userId} />}
    </div>
  );
}

export default Alarm;
