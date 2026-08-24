import React from 'react';
import { useDomRefs } from '../app/context/RefContext';

function Background() {
  const { background } = useDomRefs();
  return (
    <div>
      <img
        className='w-full h-full fixed object-cover main-filter '
        id='background'
        src='/images/png/background.png'
        alt='background-img'
        ref={background}
      />
    </div>
  );
}

export default Background;
