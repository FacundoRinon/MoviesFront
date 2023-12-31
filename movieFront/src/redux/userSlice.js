import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    removeToken(state, action) {
      return null;
    },
    updateUser(state, action) {
      const newUser = {
        ...state,
        scored: action.payload,
      };
      return newUser;
    },
    toggleWatchlist(state, action) {
      try {
        if (state && state.favoriteMovies) {
          const { element_id } = action.payload;

          const existingIndex = state.favoriteMovies.findIndex(
            (movie) => movie.element_id === element_id
          );

          if (existingIndex === -1) {
            const newFavorites = [action.payload, ...state.favoriteMovies];
            return { ...state, favoriteMovies: newFavorites };
          } else {
            const newFavorites = state.favoriteMovies.filter(
              (movie, index) => index !== existingIndex
            );
            return { ...state, favoriteMovies: newFavorites };
          }
        }
      } catch (error) {
        console.log(error);
      }
      return state;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setToken, removeToken, updateUser, toggleWatchlist } = actions;
export default reducer;
