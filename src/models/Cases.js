import * as service from './../services';

export var casesOption = function (cases) {

    cases.effects.fetch = function* ({ payload: { page } }, { call, put }) {
        // 无条件的
        const cases = yield call(service["fetchCasePage"], 'Case', {},{page});
        // 获得cases 里的 sku_num;
        let sku_numList = [];
        cases.data.data.list.forEach(v => {
          v.points.forEach(k => {
            sku_numList.push(k.sku_num);
          })
        })
        const skus = yield call(service["fetchSkuPage"], 'Sku',{"cnum":{"$in":sku_numList}});
        let skuList = [];
        skus.data.data.list.forEach(v => {
          skuList.push(v);
        })
        const rd = { data: cases.data.data.list, total: cases.data.data.count, page: parseInt(page) ,skuList}
        console.log(rd);
        yield put({ type: 'save22', payload: rd });
    }

    cases.effects.add = function* ({ payload: { id, values } }, { call, put, select }) {
        let caseMap = yield call(service['getCaseMap'], 'Case');
        values.order = Object.keys(caseMap).length + 1;
        yield call(service['CaseService'].insert, values);
        const page = yield select(state => state['cases'].page);
        yield put({ type: 'fetch', payload: { page } });
    }
    cases.effects.remove = function* ({ payload: { id } }, { call, put, select }) {
        console.log('remove', { id })
        yield call(service['CaseService'].remove, id);
        const page = yield select(state => state['cases'].page);
        yield put({ type: 'fetch', payload: { page } });
    }
    cases.effects.patch = function* ({ payload: { id, values } }, { call, put, select }) {
        console.log('patch', { id })
        yield call(service['CaseService'].update, id, values);
        const page = yield select(state => state['cases'].page);
        yield put({ type: 'fetch', payload: { page } });
    }

    // cases.effects.fetchSkuId = function* ({ payload: { id } }, { call, put }) {
    //     // 无条件的
    //     const cases = yield call(service["getDataService"], 'Sku', {"cnum":id});
    //     const rd = { fetchSku: cases.data.data.list}
    //     console.log(rd);
    //     yield put({ type: 'save22', payload: rd });
    // }
}
