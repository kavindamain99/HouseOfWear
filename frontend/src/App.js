import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter></BrowserRouter>
    </Suspense>
  );
};

export default App;
