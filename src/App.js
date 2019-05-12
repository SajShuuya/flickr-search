import React from "react";
import { Grommet } from "grommet";
import { Provider } from "react-redux";

import appStore from "./appStore";
import Home from "./home";

const theme = {
  global: {
    input: {
      weight: 400
    },
    font: {
      family: "Roboto"
    }
  }
};

function App() {
  return (
    <Provider store={appStore}>
      <Grommet theme={theme} full>
        <Home />
      </Grommet>
    </Provider>
  );
}

export default App;
