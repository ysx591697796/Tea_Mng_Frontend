import { query as queryUsers, queryCurrent } from '@/services/user';
import { upInfoPhone, getInfoList } from '@/services/api';
import Redirect from 'umi/redirect';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    InfoListcontent: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });

    },
    *upInfoPhone({ payload, callback }, { call, put }) {
      const res = yield call(upInfoPhone, payload);
      if (callback)
        callback();
    },
    *getInfoList({ payload, callback }, { call, put }) {
      const res = yield call(getInfoList, payload);
      var data = res
      yield put({
        type: 'InfoListcon',
        payload: data,
      })
      if (callback)
        callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    InfoListcon(state, { payload }) {
      return {
        ...state,
        InfoListcontent: payload,
      }
    },
  },
};
