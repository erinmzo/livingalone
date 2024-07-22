export async function getMustPostOnMain() {
  const response = await fetch("/api/main/must", { next: { revalidate: 60 } });
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch("/api/category");
  const data = await response.json();
  return data;
}
