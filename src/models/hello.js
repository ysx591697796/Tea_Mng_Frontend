import { helloc, test } from '../services/api';
import { notification } from 'antd';
import router from 'umi/router'
export default {
    namespace: 'hello',
    state: {
        hellocontent: [],
        testcontent: [],
    },

    effects: {
        *helloc({ payload, callback }, { call, put }) {
            const res = yield call(helloc, payload);
            console.log('res---:', res)
            var data = res
            yield put({
                type: 'hellocon',
                payload: data
            })
            if (callback)
                callback()
        },
        *test({ payload, callback }, { call, put }) {
            const res = yield call(test, payload);
            var data = res
            console.log('res1---:', res)
            yield put({
                type: 'testRe',
                payload: data
            })
            if (callback)
                callback()
        },
    },

    reducers: {
        hellocon(state, { payload }) {
            console.log('hellocontent--------------->', payload)
            return {
                ...state,
                hellocontent: payload
            }
        },
        testRe(state, { payload }) {
            // console.log('hellocontent--------------->',payload)
            return {
                ...state,
                testcontent: payload
            }
        },
    }
}