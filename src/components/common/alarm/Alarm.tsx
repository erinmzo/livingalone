"use client";
import { useIsAlarm } from "@/zustand/alarmStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import AlarmList from "./AlarmList";

function Alarm() {
  const { isOpenAlarm, setIsOpenAlarm } = useIsOpen();
  const isAlarm = useIsAlarm((state) => state.isAlarm);

  return (
    <li className="relative">
      <button onClick={() => setIsOpenAlarm(!isOpenAlarm)} className="flex gap-1">
        알람
        {isAlarm && <span className="block w-1 h-1 bg-red-3 rounded-full"></span>}
      </button>
      {isOpenAlarm && <AlarmList />}
    </li>
  );
}

export default Alarm;
