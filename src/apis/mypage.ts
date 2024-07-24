export async function getMyProfile(id: string) {
  const response = await fetch(`/api/auth/profile/${id}`);
  const data = response.json();
  return data;
}
