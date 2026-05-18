// src/admin/exportNodeBank.js

function formatPosition(position) {
  return `{ x: ${Number(position?.x ?? 0)}, y: ${Number(position?.y ?? 0)} }`;
}

function formatHandle(handle) {
  return `{ id: "${handle.id}", type: "${handle.type}", position: Position.${capitalize(handle.position)}, offset: ${Number(handle.offset ?? 0)} }`;
}

function capitalize(value) {
  if (!value) return "Right";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function cleanNodeForExport(node) {
  const data = node.data ?? {};

  const cleanData = {
    label: data.label ?? "",
    handles: Array.isArray(data.handles) ? data.handles : [],
  };

  if (data.isJunction) cleanData.isJunction = true;
  if (data.variant) cleanData.variant = data.variant;
  if (data.className) cleanData.className = data.className;
  if (data.style) cleanData.style = data.style;

  return {
    id: node.id,
    position: node.position,
    data: cleanData,
    type: node.type ?? "customNode",
    style: node.style,
  };
}

function cleanEdgeForExport(edge) {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    label: edge.label,
    type: edge.type,
    markerEnd: edge.markerEnd,
    data: edge.data,
  };
}

export function generateNodeBankCode(nodes, edges) {
  const nodeLines = nodes.map((node) => {
    const cleanNode = cleanNodeForExport(node);
    const dataParts = [];

    dataParts.push(`label: ${JSON.stringify(cleanNode.data.label)}`);

    if (cleanNode.data.isJunction) {
      dataParts.push(`isJunction: true`);
    }

    if (cleanNode.data.variant) {
      dataParts.push(`variant: ${JSON.stringify(cleanNode.data.variant)}`);
    }

    if (cleanNode.data.className) {
      dataParts.push(`className: ${JSON.stringify(cleanNode.data.className)}`);
    }

    if (cleanNode.data.style) {
      dataParts.push(`style: ${JSON.stringify(cleanNode.data.style)}`);
    }

    const handlesCode = cleanNode.data.handles?.length ? `[${cleanNode.data.handles.map(formatHandle).join(", ")}]` : "[]";

    dataParts.push(`handles: ${handlesCode}`);

    const styleCode = cleanNode.style ? `,\n    style: ${JSON.stringify(cleanNode.style, null, 2)}` : "";

    return `  {
    id: "${cleanNode.id}",
    position: ${formatPosition(cleanNode.position)},
    data: { ${dataParts.join(", ")} },
    type: "${cleanNode.type ?? "customNode"}"${styleCode}
  }`;
  });

  const edgeLines = edges.map((edge) => {
    const cleanEdge = cleanEdgeForExport(edge);

    const parts = [`id: "${cleanEdge.id}"`, `source: "${cleanEdge.source}"`, `target: "${cleanEdge.target}"`];

    if (cleanEdge.sourceHandle) parts.push(`sourceHandle: "${cleanEdge.sourceHandle}"`);
    if (cleanEdge.targetHandle) parts.push(`targetHandle: "${cleanEdge.targetHandle}"`);
    if (cleanEdge.label) parts.push(`label: ${JSON.stringify(cleanEdge.label)}`);
    if (cleanEdge.type) parts.push(`type: "${cleanEdge.type}"`);
    if (cleanEdge.markerEnd) parts.push(`markerEnd: ${JSON.stringify(cleanEdge.markerEnd)}`);
    if (cleanEdge.data) parts.push(`data: ${JSON.stringify(cleanEdge.data)}`);

    return `  { ${parts.join(", ")} }`;
  });

  return `import { Position } from "@xyflow/react";

export const initialNodes = [
${nodeLines.join(",\n")}
];

export const initialEdges = [
${edgeLines.join(",\n")}
];
`;
}
