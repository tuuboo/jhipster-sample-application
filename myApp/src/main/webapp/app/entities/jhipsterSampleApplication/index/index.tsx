import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Index from './index';
import IndexDetail from './index-detail';
import IndexUpdate from './index-update';
import IndexDeleteDialog from './index-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IndexUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IndexUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IndexDetail} />
      <ErrorBoundaryRoute path={match.url} component={Index} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IndexDeleteDialog} />
  </>
);

export default Routes;
