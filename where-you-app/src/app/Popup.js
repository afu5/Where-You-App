import React, { useEffect } from 'react';
import Link from 'next/link';

function Popup({ children, onClose }) {
  return(
    <div className='overlay'>
      <div className='add-popup'>
        {children}
        <button className='close' onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Popup;