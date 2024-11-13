import { createSlice } from "@reduxjs/toolkit";

const placesSlice = createSlice({
  name: "places",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPlacesStart: (state) => {
      state.loading = true;
    },
    fetchPlacesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPlacesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markAsVisited: () => {},
    markAsVisitedSuccess: (state, action) => {
      const placeId = action.payload;
      const place = state.data.find((place) => place.id === placeId);
      if (place) {
        place.visited = true;
      }
    },
    markAsVisitedFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlacesStart,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  markAsVisited,
  markAsVisitedSuccess,
  markAsVisitedFailure,
} = placesSlice.actions;

export default placesSlice.reducer;
