"use client";
import React from "react";
import { User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import UserItem from "./user-item";
interface RecommendedProps {
  data: User[];
}
const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showRecommended = !collapsed && data.length > 0;
  return (
    <div>
      {showRecommended && (
        <div className="pl-6 mb-4">
          <p className="text-muted-foreground text-sm">Recommended</p>
        </div>
      )}
      <ul>
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageURL={user.imageURL}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;
