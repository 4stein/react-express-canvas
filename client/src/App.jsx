import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Canvas from "./components/Canvas/Canvas";
import SettingBar from "./components/SettingBar/SettingBar";
import Toolbar from "./components/Toolbar/Toolbar";

const App = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <div className="app">
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Navigate to={`f${(+new Date()).toString(16)}`} />}
            />
            <Route
              path=":id"
              element={
                <>
                  <Toolbar />
                  <SettingBar />
                  <Canvas />
                </>
              }
            />
          </Route>
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
