import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const TRANSACTION_ENDPOINT = `${
  import.meta.env.VITE_API_ENDPOINT
}/transactions`;

export interface Transaction {
  _id: string;
  name: string;
  active: boolean;
  type: string;
  amount: number;
  transaction_date: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
  };
  group: {
    _id: string;
    name: string;
  };
}

export interface Stats {
  _id: string;
  amount: number;
  name: string;
}

export interface TransactionState {
  status: "loading" | "succeeded" | "failed";
  error: string;
  list: Transaction[];
  stats: Stats[];
  details: Transaction;
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: Stats[];
}

export const getTransactions = createAsyncThunk(
  "transaction/fetchtransactions",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TransactionResponse>(
        `${TRANSACTION_ENDPOINT}`,
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

export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (
    values: {
      name: string;
      type: string;
      note: string;
      group_id: string;
      transaction_date: string;
      token: string;
      amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { name, amount, type, token, note, group_id, transaction_date } =
        values;

      const { data } = await axios.post<Transaction>(
        `${TRANSACTION_ENDPOINT}`,
        {
          name,
          type,
          note,
          group_id,
          amount,
          transaction_date,
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

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    status: "loading",
    error: "",
    list: [],
    stats: [],
    users: [],
    details: {
      _id: "",
      name: "",
      active: false,
      type: "",
      amount: 0,
      transaction_date: "",
      createdAt: "",
      user: {
        _id: "",
        name: "",
        email: "",
        picture: ""
      },
      group: {
        _id: "",
        name: "",
      },
    },
  } as TransactionState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getTransactions.fulfilled,
        (state, action: PayloadAction<TransactionResponse>) => {
          state.status = "succeeded";
          state.error = "";
          state.list = action.payload.transactions;
          state.stats = action.payload.total;
        }
      )
      .addCase(getTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.error.message as string) || "An unknown error occurred.";
      })
      .addCase(createTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { payload } = action;
          state.status = "succeeded";
          state.error = "";
          state.details = payload;
          state.list = [payload.transaction, ...state.list];
        }
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.error.message as string) || "An unknown error occurred";
      });
  },
});

export default transactionSlice.reducer;
