import { Handle, Position } from "@xyflow/react";

function handleStyle(position, offset) {
  if (offset == null) return undefined;

  if (position === Position.Top || position === Position.Bottom) {
    return { left: `calc(50% + ${offset}px)` };
  }
  return { top: `calc(50% + ${offset}px)` };
}

function GroupedDevicesNode({ data, isGhost, isNew }) {
  const items = data?.items ?? [];

  return (
    <div
      className={["groupNode", "node-animate", isGhost ? "ghostContent" : "", isNew ? "node-animate--in" : ""].filter(Boolean).join(" ")}
      style={data?.style ?? {}}
    >
      <div className="groupNode__title">{data?.label ?? "Computing Devices"}</div>

      <div className="groupNode__grid">
        {items.map((item) => (
          <div key={item.id} className={`groupNode__item ${item.className ?? ""}`.trim()} style={item.style ?? {}}>
            <span className="groupNode__itemText">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function customNode(props) {
  const handles = props.data?.handles ?? [];
  const isJunction = props.data?.isJunction;
  const isGhost = props.data?.isGhost;
  const className = props.data?.className ?? "";
  const innerStyle = props.data?.style ?? {};
  const nodeStyle = props.style ?? {};
  const variant = props.data?.variant ?? "default";

  const isNew = !!props.data?.isNew && !isGhost && !isJunction;

  return (
    <div
      className={isJunction ? "junction-node" : "nodeWrapper"}
      style={{
        position: "relative",
        width: nodeStyle.width,
        height: nodeStyle.height,
        transform: isGhost ? "scale(0.98)" : "scale(1)",
        transition: "transform 350ms ease",
        pointerEvents: isGhost ? "none" : "auto",
      }}
    >
      {!isJunction && variant === "groupedDevices" && <GroupedDevicesNode data={props.data} isGhost={isGhost} isNew={isNew} />}

      {!isJunction && variant !== "groupedDevices" && (
        <div
          className={["nodeStyle", "nodeContent", "node-animate", isGhost ? "ghostContent" : "", isNew ? "node-animate--in" : "", className]
            .filter(Boolean)
            .join(" ")}
          style={innerStyle}
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
