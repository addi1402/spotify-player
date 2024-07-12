import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  try {
    const response = await fetch("https://cms.samespace.com/items/songs");
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }
    const data = await response.json();
    return data?.data;
  } catch (error) {
    throw new Error(`Failed to fetch songs: ${error.message}`);
  }
});

const songSlice = createSlice({
  name: "songs",
  initialState: {
    data: [],
    searchResults: [],
    current: {},
    songTab: "forYou",
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        state.current = {
          ...action.payload[0],
          cover: `https://cms.samespace.com/assets/${action.payload[0].cover}`,
        };
        state.searchResults = state.data;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    playNext: (state) => {
      const index = state.data.findIndex(
        (song) => song.id === state.current.id
      );
      if (index < state.data.length - 1) {
        state.current = {
          ...state.data[index + 1],
          cover: `https://cms.samespace.com/assets/${
            state.data[index + 1].cover
          }`,
        };
      }
    },
    playPrevious: (state) => {
      const index = state.data.findIndex(
        (song) => song.id === state.current.id
      );
      if (index > 0) {
        state.current = {
          ...state.data[index - 1],
          cover: `https://cms.samespace.com/assets/${
            state.data[index - 1].cover
          }`,
        };
      }
    },
    searchSong: (state, action) => {
      if (action.payload === "") state.searchResults = state.data;
      else {
        state.searchResults = state.data.filter(
          (song) =>
            song.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            song.artist.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    setSongTab: (state, action) => {
      state.songTab = action.payload;
    },
  },
});

export default songSlice.reducer;
export const { setCurrent, playNext, playPrevious, searchSong, setSongTab } =
  songSlice.actions;
