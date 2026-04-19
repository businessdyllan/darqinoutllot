'use client';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';

export function useKeyboardShortcuts() {
  const [spaceDown, setSpaceDown] = useState(false);
  const panningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const setViewport = useStore((s) => s.setViewport);
  const viewport = useStore((s) => s.viewport);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setSpaceDown(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpaceDown(false);
        panningRef.current = false;
        // commit delta into offset
        setViewport({
          panOffsetX: viewport.panOffsetX + viewport.panDeltaX,
          panOffsetY: viewport.panOffsetY + viewport.panDeltaY,
          panDeltaX: 0,
          panDeltaY: 0,
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [viewport, setViewport]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!spaceDown) return;
    panningRef.current = true;
    panStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent, W: number, H: number, atr: number) => {
    if (!panningRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    const maxVis = Math.max(10, Math.floor((W - 80) / 6));
    const candleW = (W - 80) / maxVis;
    setViewport({
      panDeltaX: -dx / candleW,
      panDeltaY: (dy / H) * atr * 12,
    });
  };

  const handleMouseUp = () => {
    if (!panningRef.current) return;
    panningRef.current = false;
    const s = useStore.getState();
    setViewport({
      panOffsetX: s.viewport.panOffsetX + s.viewport.panDeltaX,
      panOffsetY: s.viewport.panOffsetY + s.viewport.panDeltaY,
      panDeltaX: 0,
      panDeltaY: 0,
    });
  };

  return { spaceDown, handleMouseDown, handleMouseMove, handleMouseUp };
}
