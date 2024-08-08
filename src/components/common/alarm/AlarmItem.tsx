"use client";
import { updateIsRead } from "@/apis/alarm";
import { TAlarm, TEditAlarm } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

function AlarmItem({ alarm, userId }: { alarm: TAlarm; userId: string }) {
  const queryClient = useQueryClient();

  const { mutate: setIsRead } = useMutation({
    mutationFn: (editAlarm: TEditAlarm) => updateIsRead(editAlarm),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alarm", userId] }),
  });

  const handleClickAlarm = (alarmId: string) => {
    if (!alarm.is_read) {
      const editAlarm = {
        user_id: alarm.user_id,
        is_read: true,
        id: alarmId,
      };
      setIsRead(editAlarm);
    }
  };
  
  return (
    <button
      className={`block w-full py-5 px-8 ${alarm.is_read ? " bg-white" : " bg-yellow-1"} text-left`}
      onClick={() => handleClickAlarm(alarm.id)}
    >
      {alarm.type === "chat" && (
        <Link href={alarm.link}>
          <span className="text-main-7 font-bold">{alarm.group_posts.title}</span>에 채팅이 왔습니다.
        </Link>
      )}
      {alarm.type === "apply" && (
        <Link href={alarm.link}>
          <span className="text-main-7 font-bold">{alarm.group_posts.title}</span>에 공구 신청이 왔습니다.
        </Link>
      )}
      {alarm.type === "comment" && (
        <Link href={alarm.link}>
          <span className="text-main-7 font-bold">{alarm.must_posts.title}</span>에 댓글이 달렸습니다.
        </Link>
      )}
    </button>
  );
}

export default AlarmItem;
