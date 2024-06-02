"use client";
import { StorageHelper } from "@/helpers/StorageHelper";
import { userStore } from "@/stores/userStore";
import { useEffect } from "react";

export default function useGetAddress() {
  const { setAddress } = userStore();
  const { getItem } = StorageHelper;

  useEffect(() => {
    const user = getItem("user");
    if (user) setAddress(user.address);
  }, []);
}
