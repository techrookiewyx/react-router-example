import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import InBoxApp from "./inbox";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 将此应用程序“安装”到 /inbox URL 路径名下。 所有路线和链接
        与这个名字相关。 */}
    <HashRouter basename="inbox">
      <InBoxApp/>
    </HashRouter>
  </React.StrictMode>
);
