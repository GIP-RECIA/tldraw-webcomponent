import React from "react";
import ReactDOM from "react-dom/client";

import reactToWebComponent from "react-to-webcomponent";
import Editor from "./components/Editor";

customElements.define(
  "tldraw-editor",
  reactToWebComponent(Editor, React, ReactDOM, {
    dashStyleAttributes: true,
    shadow: false,
  })
);
