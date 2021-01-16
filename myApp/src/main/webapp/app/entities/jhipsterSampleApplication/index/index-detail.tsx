import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './index.reducer';
import { IIndex } from 'app/shared/model/jhipsterSampleApplication/index.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIndexDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IndexDetail = (props: IIndexDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { indexEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myApp.jhipsterSampleApplicationIndex.detail.title">Index</Translate> [<b>{indexEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="indexName">
              <Translate contentKey="myApp.jhipsterSampleApplicationIndex.indexName">Index Name</Translate>
            </span>
          </dt>
          <dd>{indexEntity.indexName}</dd>
        </dl>
        <Button tag={Link} to="/index" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/index/${indexEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ index }: IRootState) => ({
  indexEntity: index.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndexDetail);
