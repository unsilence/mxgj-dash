import * as service from './../services';

export var addBannerOption = function (banner) {

    banner.effects.fetch = function* ({ payload: { page } }, { call, put }) {
        // 无条件的
        const banners = yield call(service["fetchRecommendPage"], 'Recommend', { "itype": "1" },{page});
        // let recommendRes = yield call(service['getRecommendMap'], 'Recommend');
        const rd = { data: banners.data.data.list, total: banners.data.data.count, page: parseInt(page) }
        yield put({ type: 'save22', payload: rd });
    }

    banner.effects.add = function* ({ payload: { id, values } }, { call, put, select }) {
        values.itype = '1';
        // let recommendRes = yield call(service['getRecommendMap'], 'Recommend');
        // values.order = Object.keys(recommendRes).length + 1;
        yield call(service['RecommendService'].insert, values);
        const page = yield select(state => state['banners'].page);
        yield put({ type: 'fetch', payload: { page } });
    }
    banner.effects.remove = function* ({ payload: { id } }, { call, put, select }) {
        console.log('remove', { id })
        yield call(service['RecommendService'].remove, id);
        const page = yield select(state => state['banners'].page);
        yield put({ type: 'fetch', payload: { page } });
    }
    banner.effects.patch = function* ({ payload: { id, values } }, { call, put, select }) {
        console.log('patch', { id })
        yield call(service['RecommendService'].update, id, values);
        const page = yield select(state => state['banners'].page);
        yield put({ type: 'fetch', payload: { page } });
    }
}