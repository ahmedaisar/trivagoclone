
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
});

export default DynamicMap;
