import * as service from './services';

let generate = (name, serviceName) => {
  console.log(name, serviceName, '-----------------generate')
  return {
    namespace: name,
    state: {
      list: [],
      total: null,
    },
    reducers: {
      save22(state, { payload: { data: list, total, page, serialList } }) {
        page = page || 1
        return { ...state, list, total, page, serialList };
      },
    },
    effects: {
      *fetch({ payload: { page } }, { call, put }) {
        const d = yield call(service[serviceName].fetch, { page });
        const rd = { data: d.data.data.list, total: d.data.data.count, page: parseInt(page) }
        yield put({ type: 'save22', payload: rd });
      },
      *remove({ payload: { id } }, { call, put, select }) {
        console.log('remove', { id })
        yield call(service[serviceName].remove, id);
        const page = yield select(state => state[name].page);
        yield put({ type: 'fetch', payload: { page } });
      },
      *patch({ payload: { id, values } }, { call, put, select }) {
        console.log('patch', { id })
        yield call(service[serviceName].update, id, values);
        const page = yield select(state => state[name].page);
        yield put({ type: 'fetch', payload: { page } });
      },
      *add({ payload: { id, values } }, { call, put, select }) {
        console.log('patch', { id })
        yield call(service[serviceName].insert, values);
        const page = yield select(state => state[name].page);
        yield put({ type: 'fetch', payload: { page } });
      }
    },
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
          if (pathname === '/' + name) {
            if (localStorage.token.length > 10) {
              dispatch({ type: 'fetch', payload: query });
            } else {
              history.push('/login')
            }
          }
        });
      },
    },
  }
}

['Category', 'Customer', 'Order', 'Country', 'Brand', 'Color', 'User', 'Serial'].map(cls => {
  exports[cls + 'Model'] = generate(cls.toLowerCase() + 's', cls + 'Service')
})

exports['login'] = function () { return service.login() }
exports['checkAccount'] = function () { return service.checkAccount() }
exports['logout'] = function () { return service.logout() }

/**-----------------------------自定义------------------------- */
exports["ColorModel"].effects.fetch = function* ({ payload: { page } }, { call, put }) {
  const colors = yield call(service["ColorService"].fetch, { page });
  const serials = yield call(service["SerialService"].fetch, { page });
  const rd = { data: colors.data.data.list, total: colors.data.data.count, page: parseInt(page), serialList: serials.data.data.list }
  yield put({ type: 'save22', payload: rd });
}