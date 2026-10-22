import type { ReactNode } from "react";

// List from design-system/components.md: default and empty states.
// Loading and error states arrive with S-11, the first story that can reach them.
type ListProps<T extends { id: number }> = {
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
};

export function List<T extends { id: number }>({ items, emptyMessage, renderItem }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="py-6 text-md text-text-muted">{emptyMessage}</p>;
  }
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.id} className="py-3">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
