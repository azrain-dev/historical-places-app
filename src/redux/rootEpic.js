import { combineEpics } from "redux-observable";
import { fetchPlacesEpic, markAsVisitedEpic } from "./placesEpic";

const rootEpic = combineEpics(fetchPlacesEpic, markAsVisitedEpic);

export default rootEpic;
