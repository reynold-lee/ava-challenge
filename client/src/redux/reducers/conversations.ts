import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

import type { RootState } from "../store";
import { ConversationType } from "../../types/Conversation";
import { ALICE } from "../../types/author";
import { MutationType } from "../../types/mutation";

// axios base url
const instance = axios.create({
  baseURL: "http://192.168.116.184:3001",
});

// Define a type for the slice state
interface ConversationState {
  // processing
  loading: boolean;
  loaded: boolean;
  adding: boolean;
  added: boolean;
  deleting: boolean;
  deleted: boolean;
  updating: boolean;
  updated: boolean;
  // states
  author: string;
  conversations?: ConversationType[];
}

// Define the initial state using that type
const initialState: ConversationState = {
  loading: false,
  loaded: false,
  added: false,
  adding: false,
  deleting: false,
  deleted: false,
  updated: false,
  updating: false,
  author: ALICE,
};

export const getConversations = createAsyncThunk(
  "conversations/getConversations",
  async () => {
    try {
      const response = await instance.post<{
        ok: boolean;
        conversations: ConversationType[];
      }>("/conversations");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addConversation = createAsyncThunk(
  "conversations/addConversation",
  async (conversation: ConversationType) => {
    try {
      const response = await instance.post<ConversationType>(
        "/addConversation",
        conversation
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteConversation = createAsyncThunk(
  "conversations/deleteConversation",
  async (id: string) => {
    const response = await instance.delete<ConversationType>(
      "/deleteConversation/" + id
    );

    return response.data;
  }
);

export const mutation = createAsyncThunk(
  "conversations/mutation",
  async (mutation: MutationType) => {
    const response = await instance.put("/mutation", mutation);
    const result: {
      ok: boolean;
      text: string;
      conversation: ConversationType;
    } = response.data;

    return result;
  }
);

export const { reducer, actions } = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    updateAuthor(state, action) {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.loaded = false;
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loaded = true;
        state.loading = false;

        state.conversations = action.payload.conversations;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.adding = false;
      })
      .addCase(addConversation.pending, (state, action) => {
        state.added = false;
        state.adding = true;
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        state.added = true;
        state.adding = false;

        state.conversations?.push(action.payload);
      })
      .addCase(addConversation.rejected, (state, action) => {
        state.deleting = false;
      })
      .addCase(deleteConversation.pending, (state, action) => {
        state.deleted = false;
        state.deleting = true;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.deleted = true;
        state.deleting = false;

        state.conversations = state.conversations?.filter(
          (conversation) => conversation.id !== action.payload.id
        );
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.deleting = false;
      })
      .addCase(mutation.pending, (state, action) => {
        state.updated = false;
        state.updating = true;
      })
      .addCase(mutation.fulfilled, (state, action) => {
        state.updated = true;
        state.updating = false;

        state.conversations?.forEach((conversation, index) => {
          if (conversation.id === action.payload.conversation.id) {
            if (state.conversations?.length)
              state.conversations[index] = action.payload.conversation;
          }
        });
      })
      .addCase(mutation.rejected, (state, action) => {
        state.updating = false;
      });
  },
});

const selectState = (state: RootState) => state.conversations;

export const selectAuthor = createSelector(
  selectState,
  (state) => state.author
);

export const selectConversaions = createSelector(
  selectState,
  (state) => state.conversations
);

export const selectUpdated = createSelector(
  selectState,
  (state) => state.updated
);

export const selectAdded = createSelector(selectState, (state) => state.added);

export const { updateAuthor } = actions;

export default reducer;
