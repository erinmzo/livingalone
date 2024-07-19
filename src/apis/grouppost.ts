export async function getGroupPostOnMain() {
  const response = await fetch("/api/grouppost", { next: { revalidate: 60 } });
  const data = await response.json();
  return data;
}
