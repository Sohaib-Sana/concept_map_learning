// src/model/edgeModel.jsx
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

export function PhaseEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, data, style } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const topLabel = data?.topLabel; // "Melting Point"
  const mainLabel = data?.mainLabel; // "Melting"

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.1,
            background: "rgba(255,255,255,0.9)",
            padding: "4px 6px",
            borderRadius: 6,
          }}
          className="nodrag nopan"
        >
          {topLabel ? <div style={{ color: "red", fontWeight: 300, fontSize: 8, marginBottom: 2 }}>{topLabel}</div> : null}

          {mainLabel ? <div style={{ color: "#111", fontWeight: 400, fontSize: 10 }}>{mainLabel}</div> : null}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
