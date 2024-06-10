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
    addScore(state, action) {
      const { score, element_id, media } = action.payload;
      const existingIndex = state.scored.findIndex(
        (s) => s.element_id == element_id
      );

      if (existingIndex === -1) {
        const newScore = [action.payload, ...state.scored];
        return { ...state, scored: newScore };
      } else {
        const updatedScores = state.scored.map((s, index) => {
          if (index === existingIndex) {
            return action.payload;
          } else {
            return s;
          }
        });
        return { ...state, scored: updatedScores };
      }
    },
    deleteScore(state, action) {
      console.log(action.payload);
      const { score, element_id, media } = action.payload;
      const existingIndex = state.scored.findIndex(
        (s) => s.element_id == element_id
      );
      if (existingIndex !== -1) {
        const updatedScores = [...state.scored];
        updatedScores.splice(existingIndex, 1);
        return { ...state, scored: updatedScores };
      } else {
        return state;
      }
    },
    editUser(state, action) {
      const newUser = {
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
      };
      return newUser;
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  setToken,
  removeToken,
  updateUser,
  toggleWatchlist,
  addScore,
  deleteScore,
  editUser,
} = actions;
export default reducer;
