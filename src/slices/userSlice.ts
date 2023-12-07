import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/auth`;
const USER_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/users`;
export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
  token: string;
}

export interface AuthState {
  status: string;
  error: string;
  user: UserInterface;
  searchList: any[];
}

const initialState: AuthState = {
  status: "",
  error: "",
  searchList: [],
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{ user: UserInterface }>(
        `${AUTH_ENDPOINT}/register`,
        {
          ...values,
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        // Handle other types of errors if needed
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{ user: UserInterface }>(
        `${AUTH_ENDPOINT}/login`,
        {
          ...values,
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        // Handle other types of errors if needed
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const searchUsers = createAsyncThunk(
  "search/users",
  async (
    values: {
      type: string;
      key: string;
      emails: any[] | null;
      search: string | null;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, type, key, emails, search } = values;
      const { data } = await axios.post<any>(
        `${USER_ENDPOINT}/search`,
        { type, key, array_search_params: emails, search },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error.message);
      } else {
        return rejectWithValue("An unknown error occured");
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        _id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.searchList = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
