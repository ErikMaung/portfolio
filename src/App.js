import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Switch>
        <Route exact path="/">
          <div>
            <h1>Welcome to My Portfolio</h1>
          </div>
        </Route>
        {/* Add more routes as needed */}
      </Switch>
    </MantineProvider>
  );
}

export default App;
