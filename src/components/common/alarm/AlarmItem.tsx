"use client";
import { deleteAlarm, updateIsRead } from "@/apis/alarm";
import { TAlarm, TDeleteAlarm, TEditAlarm } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function AlarmItem({ alarm, userId }: { alarm: TAlarm; userId: string }) {
  const queryClient = useQueryClient();

  const { mutate: setIsRead } = useMutation({
    mutationFn: (editAlarm: TEditAlarm) => updateIsRead(editAlarm),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alarm", userId] }),
  });

  const { mutate: closeAlarm } = useMutation({
    mutationFn: (closeAlarmInfo: TDeleteAlarm) => deleteAlarm(closeAlarmInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alarm", userId] }),
  });

  const handleClickAlarm = (alarmId: string) => {
    if (!alarm.is_read) {
      const editAlarmInfo = {
        user_id: alarm.user_id,
        is_read: true,
        id: alarmId,
      };
      setIsRead(editAlarmInfo);
    }
  };

  const handleCloseAlarm = (id: string) => {
    const closeAlarmInfo = {
      user_id: alarm.user_id,
      id,
    };
    closeAlarm(closeAlarmInfo);
  };

  return (
    <div>
      <div
        className={`block w-full py-4 px-3 flex items-center border border-main-8 cursor-pointer rounded-lg ${
          alarm.is_read
            ? " bg-white"
            : alarm.type === "chat"
            ? " bg-main-1"
            : alarm.type === "apply"
            ? " bg-yellow-1"
            : " bg-green-1"
        } text-left text-[13px] text-gray-4`}
        onClick={() => handleClickAlarm(alarm.id)}
      >
        {alarm.type === "chat" && (
          <div className="flex gap-2">
            {alarm.group_posts.img_url ? (
              <Image
                src={alarm.group_posts.img_url}
                alt={alarm.group_posts.title}
                width={52}
                height={52}
                className="rounded-[4px] shrink-0 h-[52px]"
              />
            ) : (
              <span className="w-[42px] h-[42px] bg-gray-2 rounded-lg"></span>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-gray-3 text-[12px]">
                <Link href={alarm.link}>{alarm.created_at.split("T").join(" ").substring(0, 10)}</Link>
              </span>
              <p className="text-[14px]">
                <span className="text-main-8">{alarm.group_posts.title}</span>에 채팅이 왔습니다.
              </p>
            </div>
          </div>
        )}
        {alarm.type === "apply" && (
          <div className="flex gap-2">
            {alarm.group_posts.img_url ? (
              <Image
                src={alarm.group_posts.img_url}
                alt={alarm.group_posts.title}
                width={52}
                height={52}
                className="rounded-[4px] shrink-0 h-[52px]"
              />
            ) : (
              <span className="w-[42px] h-[42px] bg-gray-2 rounded-lg"></span>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-gray-3 text-[12px]">
                <Link href={alarm.link}>{alarm.created_at.split("T").join(" ").substring(0, 10)}</Link>
              </span>
              <p className="text-[14px]">
                <span className="text-main-8">{alarm.group_posts.title}</span>에 공구 신청이 왔습니다.
              </p>
            </div>
          </div>
        )}
        {alarm.type === "comment" && (
          <div className="flex gap-2">
            {alarm.must_posts.img_url ? (
              <Image
                src={alarm.must_posts.img_url}
                alt={alarm.must_posts.title}
                width={52}
                height={52}
                className="rounded-[4px] shrink-0 h-[52px]"
              />
            ) : (
              <span className="w-[42px] h-[42px] bg-gray-2 rounded-lg"></span>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-gray-3 text-[12px]">
                <Link href={alarm.link}>{alarm.created_at.split("T").join(" ").substring(0, 10)}</Link>
              </span>
              <p className="text-[14px]">
                <span className="text-main-8">{alarm.must_posts.title}</span>에 댓글이 달렸습니다.
              </p>
            </div>
          </div>
        )}
        <button onClick={() => handleCloseAlarm(alarm.id)}>
          <Image src="/img/icon-close-alarm.svg" alt="삭제" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

export default AlarmItem;
