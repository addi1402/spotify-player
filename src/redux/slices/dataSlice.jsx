import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching song data
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

// Song Slice
const songSlice = createSlice({
  name: "songs",
  initialState: {
    data: [], // song data
    searchResults: [], // search-bar results
    current: {}, // current playing song
    songTab: "forYou", // active song tab
    showSongs: "true", // toggle button
    loading: false, // data loading state
    error: null, // error performing side-effects
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
      // Following CONTEXTUAL approach
      let index, nextIndex, nextSong, filteredList;
      filteredList = state.data.filter((song) => song.top_track);

      // Determining current index based on tab
      if (state.songTab === "forYou") {
        index = state.data.findIndex((song) => song.id === state.current.id);
        nextIndex = (index + 1) % state.data.length;
        nextSong = state.data[nextIndex];
      } else {
        index = filteredList.findIndex((song) => song.id === state.current.id);
        if (index === -1) {
          nextIndex = 0;
        } else {
          nextIndex = (index + 1) % filteredList.length;
        }
        nextSong = filteredList[nextIndex];
      }
      state.current = {
        ...nextSong,
        cover: `https://cms.samespace.com/assets/${nextSong.cover}`,
      };
    },
    playPrevious: (state) => {
      // Following CONTEXTUAL approach
      let index, prevIndex, prevSong, filteredList;
      filteredList = state.data.filter((song) => song.top_track);

      if (state.songTab === "forYou") {
        index = state.data.findIndex((song) => song.id === state.current.id);
        prevIndex = (index - 1 + state.data.length) % state.data.length;
        prevSong = state.data[prevIndex];
      } else {
        index = filteredList.findIndex((song) => song.id === state.current.id);
        if (index === -1) {
          prevIndex = filteredList.length - 1;
        } else {
          prevIndex = (index - 1 + filteredList.length) % filteredList.length;
        }
        prevSong = filteredList[prevIndex];
      }
      state.current = {
        ...prevSong,
        cover: `https://cms.samespace.com/assets/${prevSong.cover}`,
      };
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
    setShowSongs: (state) => {
      state.showSongs = !state.showSongs;
    },
  },
});

export default songSlice.reducer; // exporting root reducer
// exporting action generator functions
export const {
  setCurrent,
  playNext,
  playPrevious,
  searchSong,
  setSongTab,
  setShowSongs,
} = songSlice.actions;
