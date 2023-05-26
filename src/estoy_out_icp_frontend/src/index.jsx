import React from "react";
import { Principal } from "@dfinity/principal";
import { App } from "./App";
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from "antd";

const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
export default CURRENT_USER_ID;

const init = async () => {
  const container = document.getElementById('root');
  const { darkAlgorithm } = theme;
  const root = createRoot(container);
  root.render(
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}>
      <App />
    </ConfigProvider>
  );
};

init();
