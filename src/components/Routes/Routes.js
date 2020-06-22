import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HeroList from '../HeroList/HeroList';
import HeroDetail from '../HeroDetail/HeroDetail';

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HeroList />
        </Route>
        <Route path="/:id">
          <HeroDetail />
        </Route>
      </Switch>
    </div>
  );
};
