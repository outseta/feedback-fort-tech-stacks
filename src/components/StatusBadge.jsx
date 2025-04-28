import React from "react";
import clsx from "clsx";

export const STATUS_OPTIONS = [
  "all",
  "requested",
  "planned",
  "in_progress",
  "completed",
  "rejected",
];

const StatusBadge = ({
  status,
  onClick,
  isSelected,
  className = "",
  count,
}) => {
  const Element = onClick ? "button" : "div";
  const isButton = Element === "button";
  return (
    <Element
      {...(Element === "button" && { onClick })}
      className={clsx(
        "badge transition-all gap-1 capitalize",
        { "badge-soft": !isButton || (isButton && !isSelected) },
        { "badge-success": status === "completed" },
        { "badge-primary": status === "requested" },
        { "badge-info": status === "planned" },
        { "badge-warning": status === "in_progress" },
        { "badge-error": status === "rejected" },
        { "badge-ghost": status === "all" },
        { "hover:brightness-96": isButton },
        { "cursor-pointer": isButton },
        className
      )}
    >
      {status.replace("_", " ")}
      {count !== undefined && (
        <span className="text-xs opacity-75">({count})</span>
      )}
    </Element>
  );
};

export default StatusBadge;
