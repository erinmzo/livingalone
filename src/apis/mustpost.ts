export async function getMustPostOnMain() {
  const response = await fetch("/api/main/must");
  const data = await response.json();
  return data;
}

export async function getMustPostAll() {
  const response = await fetch("/api/mustpost");
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch("/api/category");
  const data = await response.json();
  return data;
}

export async function getMustPostbyCategory(categoryId: string) {
  const response = await fetch(`/api/mustpost/category/${categoryId}`);
  const data = await response.json();
  return data;
}
