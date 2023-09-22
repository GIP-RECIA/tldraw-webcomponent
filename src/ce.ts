import Editor from './components/Editor';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tldraw-editor': any;
    }
  }
}

customElements.define(
  'tldraw-editor',
  reactToWebComponent(Editor, React, ReactDOM, {
    dashStyleAttributes: true,
    shadow: false,
  }),
);
