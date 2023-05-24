import React from "react";
import { Principal } from "@dfinity/principal";
import { App } from "./App";
import { createRoot } from 'react-dom/client';

const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
export default CURRENT_USER_ID;

const init = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
};

init();
