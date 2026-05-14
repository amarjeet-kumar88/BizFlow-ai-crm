"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

export function useNotifications() {
  useEffect(() => {
    socket.on("lead.created", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("lead.created");
    };
  }, []);
}
