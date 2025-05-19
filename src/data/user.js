import { useQuery } from "@tanstack/react-query";

export const getUser = async () => {
  const user = await window.Outseta.getUser();
  return user;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
