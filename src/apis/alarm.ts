import { TAddAlarm, TDeleteAlarm, TEditAlarm } from "@/types/types";

export async function getAlarms(userId: string) {
  const response = await fetch(`/api/alarm/${userId}`);
  const data = await response.json();
  return data;
}

export async function insertAlarm(alarm: TAddAlarm) {
  const response = await fetch("/api/alarm", { method: "POST", body: JSON.stringify(alarm) });
  const data = await response.json();
  return data;
}

export async function updateIsRead(alarm: TEditAlarm) {
  const response = await fetch(`/api/alarm/${alarm.user_id}`, { method: "PUT", body: JSON.stringify(alarm) });
  const data = await response.json();
  return data;
}

export async function deleteAlarm(alarm: TDeleteAlarm) {
  const response = await fetch(`/api/alarm/${alarm.user_id}`, { method: "DELETE", body: JSON.stringify(alarm) });
  const data = await response.json();
  return data;
}
