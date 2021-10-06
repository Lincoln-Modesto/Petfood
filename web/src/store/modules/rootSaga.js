import { all } from '@redux-saga/core/effects';

import shop from './shop/sagas';

export default function* rootSaga() {
  return yield all([shop]);
}