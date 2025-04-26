import React from "react";
import clsx from "clsx";

const StatusBadge = ({ status, onClick, isSelected, className = "" }) => {
  const Element = onClick ? "button" : "div";
  const isButton = Element === "button";
  return (
    <Element
      {...(Element === "button" && { onClick })}
      className={clsx(
        "badge transition-all",
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
      {status === "all" ? "All" : status.replace("_", " ")}
    </Element>
  );
};

export default StatusBadge;
