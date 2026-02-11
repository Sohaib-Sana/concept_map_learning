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
  const isNew = props.data?.isNew;

  return (
    <div
      className={[isJunction ? "junction-node" : "nodeStyle", !isJunction ? "node-animate" : "", !isJunction && isNew ? "node-animate--in" : ""].join(
        " ",
      )}
      style={{ position: "relative" }}
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
