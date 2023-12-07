import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const GROUP_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/groups`;

export interface GroupDetails {
  _id: string;
  name: string;
  active: boolean;
  creator: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
  };
  members: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
  }[];
}

export interface GroupsState {
  status: string;
  error: string;
  list: GroupDetails[];
  details: {
    _id: "";
    name: "";
    active: false;
    members: {
      _id: string;
      name: string;
      email: string;
      picture: string;
      status: string;
    }[];
  };
}

export const getGroups = createAsyncThunk(
  "groups/fetchgroups",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<GroupDetails[]>(`${GROUP_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const createGroup = createAsyncThunk(
  "groups/create",
  async (
    values: {
      name: string;
      active: boolean;
      member_ids: string[];
      token: string;
      description: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { name, active, token, member_ids, description } = values;
      const { data } = await axios.post<GroupDetails>(
        `${GROUP_ENDPOINT}`,
        {
          name,
          active,
          member_ids,
          description
        },
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
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    status: "",
    error: "",
    list: [],
    details: {
      _id: "",
      name: "",
      active: false,
      members: [],
    },
  } as GroupsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getGroups.fulfilled,
        (state, action: PayloadAction<GroupDetails[]>) => {
          state.status = "succeeded";
          state.error = "";
          state.list = action.payload;
        }
      )
      .addCase(getGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.error.message as string) || "An unknown error occurred.";
      })
      .addCase(createGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createGroup.fulfilled,
        (state, action: PayloadAction<GroupDetails>) => {
          const { payload } = action;
          state.status = "succeeded";
          state.error = "";
          // @ts-ignore
          state.details = payload;
          state.list = [payload, ...state.list];
        }
      )
      .addCase(createGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.error.message as string) || "An unknown error occurred";
      });
  },
});

export default groupSlice.reducer;
