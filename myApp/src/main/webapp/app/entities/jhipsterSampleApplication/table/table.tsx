import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './table.reducer';
import { ITable } from 'app/shared/model/jhipsterSampleApplication/table.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITableProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Table = (props: ITableProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tableList, match, loading } = props;
  return (
    <div>
      <h2 id="table-heading">
        <Translate contentKey="myApp.jhipsterSampleApplicationTable.home.title">Tables</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myApp.jhipsterSampleApplicationTable.home.createLabel">Create new Table</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tableList && tableList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.jhipsterSampleApplicationTable.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.jhipsterSampleApplicationTable.age">Age</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tableList.map((table, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${table.id}`} color="link" size="sm">
                      {table.id}
                    </Button>
                  </td>
                  <td>{table.name}</td>
                  <td>{table.age}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${table.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${table.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${table.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myApp.jhipsterSampleApplicationTable.home.notFound">No Tables found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ table }: IRootState) => ({
  tableList: table.entities,
  loading: table.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
