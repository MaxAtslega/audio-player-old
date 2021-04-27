import { combineEpics } from "redux-observable";
import adminEpic from "./user.epic";
import loginEpic from "./auth.epic";

export default combineEpics(adminEpic, loginEpic);
