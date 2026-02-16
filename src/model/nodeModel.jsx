// nodeModel.jsx
import { Handle, Position } from "@xyflow/react";

function handleStyle(position, offset) {
  if (offset == null) return undefined;

  if (position === Position.Top || position === Position.Bottom) {
    return { left: `calc(50% + ${offset}px)` };
  }
  return { top: `calc(50% + ${offset}px)` };
}

export function customNode(props) {
  const handles = props.data?.handles ?? [];
  const isJunction = props.data?.isJunction;

  const isGhost = props.data?.isGhost; // ✅ NEW

  return (
    <div
      className={isJunction ? "junction-node" : "nodeStyle"}
      style={{
        position: "relative",
        opacity: isGhost ? 0 : 1,
        transform: isGhost ? "scale(0.98)" : "scale(1)",
        transition: "opacity 350ms ease, transform 350ms ease",
        pointerEvents: isGhost ? "none" : "auto",
      }}
    >
      {!isJunction && (props.data?.label ?? "Default Text")}

      {handles.map((h) => (
        <Handle
          key={h.id}
          id={h.id}
          type={h.type}
          position={h.position}
          style={handleStyle(h.position, h.offset)}
          className={h.type === "target" ? "targetHandle" : "sourceHandle"}
        />
      ))}
    </div>
  );
}
