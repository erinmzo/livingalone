export async function getMyProfile(id: string) {
  const response = await fetch(`/api/auth/profile/${id}`);
  const data = response.json();
  return data;
}

export async function getMyGroupPosts(userId: string) {
  console.log(userId);
  const response = await fetch(`/api/grouppost/user/${userId}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
