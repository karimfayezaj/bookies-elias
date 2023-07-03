import { legacy_createStore as createStore } from "redux";

import rootReducer from "./redux-reducers";

const reduxStore = createStore(rootReducer);

export default reduxStore;