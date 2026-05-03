import { useCallback, useState } from 'react';

export function useCustomCursor() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const cursorHandlers = {
    onPointerEnter: () => setVisible(true),
    onPointerLeave: () => setVisible(false),
    onPointerMove,
  };

  return { visible, position, cursorHandlers };
}
