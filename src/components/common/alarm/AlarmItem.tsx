"use client";
import { updateIsRead } from "@/apis/alarm";
import { TAlarm, TEditAlarm } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
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
      className={`block w-full py-4 px-3 border border-main-8 rounded-lg ${
        alarm.is_read ? " bg-white" : " bg-main-1"
      } text-left text-[13px] text-gray-4`}
      onClick={() => handleClickAlarm(alarm.id)}
    >
      <Link href={alarm.link} className="flex gap-2">
        {alarm.group_posts.img_url ? (
          <Image
            src={alarm.group_posts.img_url}
            alt={alarm.group_posts.title}
            width={42}
            height={42}
            className="rounded-[4px]"
          />
        ) : (
          <span className="w-[42px] h-[42px] bg-gray-2 rounded-lg"></span>
        )}
        {alarm.type === "chat" && (
          <div>
            <span className="text-main-8">{alarm.group_posts.title}</span>에 채팅이 왔습니다.
          </div>
        )}
        {alarm.type === "apply" && (
          <div>
            <span className="text-main-8">{alarm.group_posts.title}</span>에 공구 신청이 왔습니다.
          </div>
        )}
        {alarm.type === "comment" && (
          <div>
            <span className="text-main-8">{alarm.group_posts.title}</span>에 댓글이 달렸습니다.
          </div>
        )}
      </Link>
    </button>
  );
}

export default AlarmItem;
