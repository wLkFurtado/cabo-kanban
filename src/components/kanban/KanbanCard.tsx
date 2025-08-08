import React from "react";

export type KanbanCardProps = {
  id: string;
  title: string;
  description?: string;
  badges?: Array<{ id: string; label: string }>;
  footer?: React.ReactNode;
};

export function KanbanCard({ title, description, badges = [], footer }: KanbanCardProps) {
  return (
    <article
      className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-3 md:p-4 flex flex-col gap-2 min-w-0"
      role="article"
      aria-label={title}
    >
      <h3 className="text-sm font-semibold leading-tight break-words">{title}</h3>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.id}
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground"
            >
              {b.label}
            </span>
          ))}
        </div>
      )}

      {description ? (
        <p className="text-sm text-muted-foreground line-clamp-3 break-words">{description}</p>
      ) : null}

      {footer ? <div className="pt-2 border-t border-border">{footer}</div> : null}
    </article>
  );
}
