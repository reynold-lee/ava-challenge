import { model, Schema } from "mongoose";

import { IConversation } from "../types/Conversation";

const ConversationSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
  lastMutation: {
    type: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
    },
    text: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    origin: {
      alice: {
        type: Number,
        required: true,
      },
      bob: {
        type: Number,
        required: true,
      },
    },
  },
});

export default model<IConversation>("Conversation", ConversationSchema);
