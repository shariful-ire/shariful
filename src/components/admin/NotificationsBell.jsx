"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/api/notifications";

export function NotificationsBell() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30_000,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const readMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const readAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-ghost btn-sm relative"
        onClick={() => setOpen((v) => !v)}
      >
        🔔
        {unreadCount > 0 ? (
          <span className="badge badge-error badge-xs absolute -top-1 -right-1">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 rounded-box shadow-lg z-10 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-base-300">
            <span className="font-semibold text-sm">Notifications</span>
            {unreadCount > 0 ? (
              <button
                type="button"
                className="text-xs link"
                onClick={() => readAllMutation.mutate()}
              >
                Mark all read
              </button>
            ) : null}
          </div>
          {!notifications.length ? (
            <p className="p-3 text-sm" style={{ color: "var(--po-muted)" }}>
              No notifications yet.
            </p>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-3 text-sm border-b border-base-300 last:border-0 ${
                    n.isRead ? "" : "bg-base-200"
                  }`}
                >
                  <a
                    href={n.link || "#"}
                    className="block"
                    onClick={() => {
                      if (!n.isRead) readMutation.mutate(n._id);
                      setOpen(false);
                    }}
                  >
                    {n.message}
                    <span className="block text-xs mt-1" style={{ color: "var(--po-muted)" }}>
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
