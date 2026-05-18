// src/admin/AdminEditableNode.jsx
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";

function toReactFlowPosition(position) {
  if (!position) return Position.Right;

  const normalized = String(position).toLowerCase();

  if (normalized === "top") return Position.Top;
  if (normalized === "right") return Position.Right;
  if (normalized === "bottom") return Position.Bottom;
  if (normalized === "left") return Position.Left;

  return position;
}

function handleStyle(position, offset) {
  if (offset == null || Number(offset) === 0) return undefined;

  const reactFlowPosition = toReactFlowPosition(position);

  if (reactFlowPosition === Position.Top || reactFlowPosition === Position.Bottom) {
    return { left: `calc(50% + ${Number(offset)}px)` };
  }

  return { top: `calc(50% + ${Number(offset)}px)` };
}

function stopCanvasEvents(event) {
  event.stopPropagation();
}

function AutoResizeTextarea({ value, onChange, placeholder = "Node label", className = "", rows = 1 }) {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={onChange}
      onPointerDown={stopCanvasEvents}
      onMouseDown={stopCanvasEvents}
      onClick={stopCanvasEvents}
    />
  );
}

function GroupNodeEditor({ data }) {
  const items = data?.items ?? [];

  return (
    <div className="groupNode" style={data?.style ?? {}}>
      <input
        className="groupNode__title adminInlineGroupTitle nodrag nopan"
        value={data?.label ?? ""}
        placeholder="Group title"
        onChange={(event) => data?.onLabelChange?.(event.target.value)}
        onPointerDown={stopCanvasEvents}
        onMouseDown={stopCanvasEvents}
        onClick={stopCanvasEvents}
      />

      <div className="groupNode__grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={["groupNode__item", item.isSpacer ? "groupNode__item--spacer" : ""].filter(Boolean).join(" ")}
            style={item.style ?? {}}
          >
            <div className="groupNode__itemText">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminEditableNode({ id, data, selected }) {
  const updateNodeInternals = useUpdateNodeInternals();

  const handles = useMemo(() => {
    return Array.isArray(data?.handles) ? data.handles : [];
  }, [data?.handles]);

  const handleSignature = useMemo(() => {
    return handles
      .map((handle) => {
        return [handle.id, handle.type, handle.position, handle.offset ?? 0].join(":");
      })
      .join("|");
  }, [handles]);

  useEffect(() => {
    /**
     * React Flow needs this when handles are added, removed,
     * renamed, moved, or switched from source to target.
     *
     * Without this, newly edited handles may look correct in React,
     * but React Flow may still use the old internal handle map.
     */
    updateNodeInternals(id);
  }, [id, handleSignature, updateNodeInternals]);

  const isJunction = !!data?.isJunction;
  const variant = data?.variant ?? "default";
  const className = data?.className ?? "";

  if (isJunction) {
    return (
      <div
        className={["nodeWrapper", "junction-node", "adminVisibleJunctionNode", selected ? "adminSelectedOriginalNode" : ""]
          .filter(Boolean)
          .join(" ")}
        title="Junction node"
      >
        <div className="adminJunctionDot" />

        {handles.map((handle, index) => {
          const handleId = String(handle.id || `handle-${index}`);
          const handleType = handle.type === "target" ? "target" : "source";

          return (
            <Handle
              key={`${handleType}-${handleId}-${index}`}
              id={handleId}
              type={handleType}
              position={toReactFlowPosition(handle.position)}
              style={handleStyle(handle.position, handle.offset)}
              className={handleType === "target" ? "targetHandle" : "sourceHandle"}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={["nodeWrapper", "node-animate", selected ? "adminSelectedOriginalNode" : ""].filter(Boolean).join(" ")}>
      {variant === "groupedDevices" ? (
        <GroupNodeEditor data={data} />
      ) : (
        <div className={["nodeContent", className].filter(Boolean).join(" ")} style={data?.style ?? {}}>
          <AutoResizeTextarea
            className="adminInlineOriginalNodeLabel nodrag nopan"
            value={data?.label ?? ""}
            placeholder="Node label"
            rows={1}
            onChange={(event) => data?.onLabelChange?.(event.target.value)}
          />
        </div>
      )}

      {handles.map((handle, index) => {
        const handleId = String(handle.id || `handle-${index}`);
        const handleType = handle.type === "target" ? "target" : "source";

        return (
          <Handle
            key={`${handleType}-${handleId}-${index}`}
            id={handleId}
            type={handleType}
            position={toReactFlowPosition(handle.position)}
            style={handleStyle(handle.position, handle.offset)}
            className={handleType === "target" ? "targetHandle" : "sourceHandle"}
          />
        );
      })}
    </div>
  );
}
