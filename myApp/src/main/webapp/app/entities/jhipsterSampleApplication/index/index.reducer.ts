import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IIndex, defaultValue } from 'app/shared/model/jhipsterSampleApplication/index.model';

export const ACTION_TYPES = {
  FETCH_INDEX_LIST: 'index/FETCH_INDEX_LIST',
  FETCH_INDEX: 'index/FETCH_INDEX',
  CREATE_INDEX: 'index/CREATE_INDEX',
  UPDATE_INDEX: 'index/UPDATE_INDEX',
  DELETE_INDEX: 'index/DELETE_INDEX',
  RESET: 'index/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIndex>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type IndexState = Readonly<typeof initialState>;

// Reducer

export default (state: IndexState = initialState, action): IndexState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INDEX_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INDEX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INDEX):
    case REQUEST(ACTION_TYPES.UPDATE_INDEX):
    case REQUEST(ACTION_TYPES.DELETE_INDEX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INDEX_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INDEX):
    case FAILURE(ACTION_TYPES.CREATE_INDEX):
    case FAILURE(ACTION_TYPES.UPDATE_INDEX):
    case FAILURE(ACTION_TYPES.DELETE_INDEX):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDEX_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDEX):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INDEX):
    case SUCCESS(ACTION_TYPES.UPDATE_INDEX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INDEX):
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

const apiUrl = 'services/jhipstersampleapplication/api/indices';

// Actions

export const getEntities: ICrudGetAllAction<IIndex> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INDEX_LIST,
  payload: axios.get<IIndex>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IIndex> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INDEX,
    payload: axios.get<IIndex>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IIndex> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INDEX,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIndex> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INDEX,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIndex> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INDEX,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
