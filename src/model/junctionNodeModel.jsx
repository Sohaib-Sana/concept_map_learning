import { Handle, Position } from "@xyflow/react";

export function JunctionNode({ data }) {
  return (
    <div className="junction-node">
      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Left} id="out1" />
      <Handle type="source" position={Position.Right} id="out2" />
    </div>
  );
}
