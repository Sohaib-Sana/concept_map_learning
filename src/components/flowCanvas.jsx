// src/components/FlowCanvas.jsx
import { useCallback, useEffect } from "react";
import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";

export function FlowCanvas({ nodes, edges, nodeTypes, onNodesChange, onEdgesChange, onConnect, focusTarget, overlayRect }) {
  const rf = useReactFlow();

  const clampLocal = (v, min, max) => Math.max(min, Math.min(max, v));
  const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  const focusAvoidingOverlay = useCallback(
    (ids) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const fallbackPanel = { left: 16, top: 16, width: 360, height: 260 };
      const p = overlayRect?.width ? overlayRect : fallbackPanel;

      const panelBox = {
        left: p.left,
        top: p.top,
        right: p.left + p.width,
        bottom: p.top + p.height,
      };

      const margin = 16;

      const focusNodes = ids
        .map((id) => rf.getNode(id))
        .filter(Boolean)
        .filter((n) => !n?.data?.isJunction);

      if (focusNodes.length === 0) return;

      const bounds = focusNodes.reduce(
        (acc, n) => {
          const x = n.positionAbsolute?.x ?? n.position.x ?? 0;
          const y = n.positionAbsolute?.y ?? n.position.y ?? 0;
          const w = n.measured?.width ?? 150;
          const h = n.measured?.height ?? 50;

          acc.minX = Math.min(acc.minX, x);
          acc.minY = Math.min(acc.minY, y);
          acc.maxX = Math.max(acc.maxX, x + w);
          acc.maxY = Math.max(acc.maxY, y + h);
          return acc;
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
      );

      const boxW = Math.max(1, bounds.maxX - bounds.minX);
      const boxH = Math.max(1, bounds.maxY - bounds.minY);
      const centerX = bounds.minX + boxW / 2;
      const centerY = bounds.minY + boxH / 2;

      const paddingPx = 48;

      let zoom;
      if (focusNodes.length === 1) {
        zoom = 1.15;
      } else {
        const z = Math.min((vw - paddingPx * 2) / boxW, (vh - paddingPx * 2) / boxH);
        zoom = clampLocal(z, 0.2, 1.4);
      }

      let anchorX = vw / 2;
      let anchorY = vh / 2;

      const screenW = boxW * zoom;
      const screenH = boxH * zoom;

      const screenBox = {
        left: anchorX - screenW / 2,
        top: anchorY - screenH / 2,
        right: anchorX + screenW / 2,
        bottom: anchorY + screenH / 2,
      };

      if (intersects(screenBox, panelBox)) {
        const neededAnchorX = panelBox.right + margin + screenW / 2;
        const maxAnchorX = vw - margin - screenW / 2;

        if (neededAnchorX <= maxAnchorX) {
          anchorX = Math.max(anchorX, neededAnchorX);
        } else {
          const neededAnchorY = panelBox.bottom + margin + screenH / 2;
          const maxAnchorY = vh - margin - screenH / 2;
          anchorY = Math.max(anchorY, Math.min(neededAnchorY, maxAnchorY));
        }
      }

      const x = anchorX - centerX * zoom;
      const y = anchorY - centerY * zoom;

      rf.setViewport({ x, y, zoom }, { duration: focusNodes.length === 1 ? 650 : 700 });
    },
    [rf, overlayRect],
  );

  useEffect(() => {
    if (!focusTarget || focusTarget.length === 0) return;

    const t = window.setTimeout(() => {
      focusAvoidingOverlay(focusTarget);
    }, 60);

    return () => window.clearTimeout(t);
  }, [focusTarget, focusAvoidingOverlay]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ padding: 0.25, duration: 450 }}
    >
      <Background />
      <Controls style={{ color: "black" }} />
    </ReactFlow>
  );
}
