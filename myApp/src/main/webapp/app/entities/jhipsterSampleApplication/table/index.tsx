import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Table from './table';
import TableDetail from './table-detail';
import TableUpdate from './table-update';
import TableDeleteDialog from './table-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TableUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TableUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TableDetail} />
      <ErrorBoundaryRoute path={match.url} component={Table} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TableDeleteDialog} />
  </>
);

export default Routes;
