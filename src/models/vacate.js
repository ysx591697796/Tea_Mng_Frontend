import { getGrade, changeAgree, changeRefuse, getClass, getVacate, addVacate, getVacateRed, updateVacate, getUser } from '../services/api';
import { notification } from 'antd';
import router from 'umi/router';
export default {
    namespace: 'vacate',
    state: {
        Gradecontent: [],
        Classcontent: [],
        Vacatecontent: [],
        addVacatecontent: [],
        getVacateRedcontent: [],
        Usercontent: [],
    },

    effects: {
        *getGrade({ payload, callback }, { call, put }) {
            const res = yield call(getGrade, payload);
            var data = res
            yield put({
                type: 'Gradecon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *getUser({ payload, callback }, { call, put }) {
            const res = yield call(getUser, payload);
            var data = res
            yield put({
                type: 'Usercon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *getClass({ payload, callback }, { call, put }) {
            const res = yield call(getClass, payload);
            var data = res
            yield put({
                type: 'Classcon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *getVacate({ payload, callback }, { call, put }) {
            const res = yield call(getVacate, payload);
            var data = res
            yield put({
                type: 'Vacatecon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *addVacate({ payload, callback }, { call, put }) {
            const res = yield call(addVacate, payload);
            var data = res
            yield put({
                type: 'addVacatecon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *getVacateRed({ payload, callback }, { call, put }) {
            const res = yield call(getVacateRed, payload);
            var data = res
            yield put({
                type: 'getVacateRedcon',
                payload: data,
            })
            if (callback)
                callback();
        },
        *updateVacate({ payload, callback }, { call, put }) {
            const res = yield call(updateVacate, payload);
            if (callback)
                callback();
        },
        *changeAgree({ payload, callback }, { call, put }) {
            const res = yield call(changeAgree, payload);
            if (callback)
                callback();
        },
        *changeRefuse({ payload, callback }, { call, put }) {
            const res = yield call(changeRefuse, payload);
            if (callback)
                callback();
        },
    },

    reducers: {
        Gradecon(state, { payload }) {
            return {
                ...state,
                Gradecontent: payload,
            }
        },
        Classcon(state, { payload }) {
            return {
                ...state,
                Classcontent: payload,
            }
        },
        Vacatecon(state, { payload }) {
            return {
                ...state,
                Vacatecontent: payload,
            }
        },
        addVacatecon(state, { payload }) {
            return {
                ...state,
                addVacatecontent: payload,
            }
        },
        getVacateRedcon(state, { payload }) {
            return {
                ...state,
                getVacateRedcontent: payload,
            }
        },
        Usercon(state, { payload }) {
            return {
                ...state,
                Usercontent: payload,
            }
        },
    }
}