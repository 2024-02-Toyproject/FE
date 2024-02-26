import React from 'react';
import './Button.scss';

export default function Button(props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      className="Button"
    >
      {props.text}
    </button>
  );
}
