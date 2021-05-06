import thunkMiddleware from "redux-thunk";
import {
  createStore,
  applyMiddleware,
  Store as ReduxStore,
  combineReducers,
} from "redux";
import { createLogger } from "redux-logger";
import rootReducer, { AppState } from "../reducers/rootReducer";
import { createEpicMiddleware } from "redux-observable";
import { AllActions } from "@actions/actions";
import rootEpic from "../epics/rootEpic";
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from "connected-next-router";
import Router from "next/router";

// @ts-ignore
import { createWrapper } from "next-redux-wrapper";

const dev: boolean = process.env.NODE_ENV !== "production";

const { composeWithDevTools } = dev
  ? require("redux-devtools-extension")
  : require("redux-devtools-extension/logOnlyInProduction");

export const configureStore = (context: any): any => {
  const epicMiddleware = createEpicMiddleware<
    AllActions,
    AllActions,
    AppState
  >();

  const routerMiddleware = createRouterMiddleware();
  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }

  const middlewares = dev
    ? [thunkMiddleware, createLogger(), epicMiddleware, routerMiddleware]
    : [epicMiddleware, routerMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  epicMiddleware.run(rootEpic);
  return store;
};

export const wrapper = createWrapper(configureStore);
