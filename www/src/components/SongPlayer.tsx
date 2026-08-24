import React, { use, useEffect, useRef } from 'react';
import { useDomRefs } from '../app/context/RefContext';
import { useApp } from '../app/context/GlobalContext';

function SongPlayer() {
  const { canvasRef } = useDomRefs();

  const { isPaying } = useApp();

  return (
    <>
      <canvas className=' opacity-90' ref={canvasRef}></canvas>;
    </>
  );
}

export default SongPlayer;
