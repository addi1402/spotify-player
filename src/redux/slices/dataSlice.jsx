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
    current: {},
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
  },
});

export default songSlice.reducer;
export const { setCurrent } = songSlice.actions;
