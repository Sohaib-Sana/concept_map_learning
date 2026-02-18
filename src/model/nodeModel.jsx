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
  const isGhost = props.data?.isGhost;

  // ✅ NEW: coming from App.jsx (nodesToRender adds data.isNew)
  const isNew = !!props.data?.isNew && !isGhost && !isJunction;

  return (
    <div
      className={isJunction ? "junction-node" : "nodeWrapper"}
      style={{
        position: "relative",
        transform: isGhost ? "scale(0.98)" : "scale(1)",
        transition: "transform 350ms ease",
        pointerEvents: isGhost ? "none" : "auto",
      }}
    >
      {!isJunction && (
        <div
          className={[
            "nodeStyle",
            "nodeContent",
            "node-animate", // ✅ base animation-ready
            isGhost ? "ghostContent" : "",
            isNew ? "node-animate--in" : "", // ✅ play pop+glow briefly
          ].join(" ")}
        >
          {props.data?.label ?? "Default Text"}
        </div>
      )}

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
