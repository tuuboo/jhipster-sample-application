import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ITable, defaultValue } from 'app/shared/model/jhipsterSampleApplication/table.model';

export const ACTION_TYPES = {
  FETCH_TABLE_LIST: 'table/FETCH_TABLE_LIST',
  FETCH_TABLE: 'table/FETCH_TABLE',
  CREATE_TABLE: 'table/CREATE_TABLE',
  UPDATE_TABLE: 'table/UPDATE_TABLE',
  DELETE_TABLE: 'table/DELETE_TABLE',
  RESET: 'table/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITable>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TableState = Readonly<typeof initialState>;

// Reducer

export default (state: TableState = initialState, action): TableState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TABLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TABLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TABLE):
    case REQUEST(ACTION_TYPES.UPDATE_TABLE):
    case REQUEST(ACTION_TYPES.DELETE_TABLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TABLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TABLE):
    case FAILURE(ACTION_TYPES.CREATE_TABLE):
    case FAILURE(ACTION_TYPES.UPDATE_TABLE):
    case FAILURE(ACTION_TYPES.DELETE_TABLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TABLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TABLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TABLE):
    case SUCCESS(ACTION_TYPES.UPDATE_TABLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TABLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'services/jhipstersampleapplication/api/tables';

// Actions

export const getEntities: ICrudGetAllAction<ITable> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TABLE_LIST,
  payload: axios.get<ITable>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITable> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TABLE,
    payload: axios.get<ITable>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITable> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TABLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITable> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TABLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITable> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TABLE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
