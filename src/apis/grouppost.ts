import { useQuery } from "@tanstack/react-query";

export const getGroupPosts = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["groupPosts"],
    queryFn: async () => {
      const response = await fetch(`/api/grouppost`);
      const { data } = await response.json();
      return data;
    },
  });
  return { data, isPending, isError };
};
