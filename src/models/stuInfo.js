import { getStuInfo } from '../services/api';
import { notification } from 'antd';
import router from 'umi/router';
export default {
    namespace: 'stuInfo',
    state: {
        stuInfocontent: [],
    },

    effects: {
        *getStuInfo({ payload, callback }, { call, put }) {
            const res = yield call(getStuInfo, payload);
            var data = res
            yield put({
                type: 'StuInfocon',
                payload: data,
            })
            if (callback)
                callback();
        },
    },
    
    reducers: {
        StuInfocon(state, { payload }) {
            return {
                ...state,
                stuInfocontent: payload,
            }
        }
    }
}