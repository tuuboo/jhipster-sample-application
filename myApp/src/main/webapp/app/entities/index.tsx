import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Table from './jhipsterSampleApplication/table';
import Field from './jhipsterSampleApplication/field';
import Index from './jhipsterSampleApplication/index';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}table`} component={Table} />
      <ErrorBoundaryRoute path={`${match.url}field`} component={Field} />
      <ErrorBoundaryRoute path={`${match.url}index`} component={Index} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
