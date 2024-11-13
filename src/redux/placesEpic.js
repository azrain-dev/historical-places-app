import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  fetchPlacesStart,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  markAsVisited,
  markAsVisitedSuccess,
  markAsVisitedFailure,
} from "./placesSlice";

export const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(fetchPlacesStart.type),
    switchMap(() =>
      from(getDocs(collection(db, "places"))).pipe(
        map((snapshot) => {
          const places = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return fetchPlacesSuccess(places);
        }),
        catchError((error) => [fetchPlacesFailure(error.message)])
      )
    )
  );

export const markAsVisitedEpic = (action$) =>
  action$.pipe(
    ofType(markAsVisited.type),
    switchMap((action) => {
      const placeId = action.payload;
      const placeRef = doc(db, "places", placeId);

      return from(updateDoc(placeRef, { visited: true })).pipe(
        map(() => markAsVisitedSuccess(placeId)),
        catchError((error) => [markAsVisitedFailure(error.message)])
      );
    })
  );

export default fetchPlacesEpic;
