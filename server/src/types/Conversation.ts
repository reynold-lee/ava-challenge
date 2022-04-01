import Document from "mongoose";

export interface IConversation extends Document {
  id: string;
  text: string;
  lastMutation: {
    type: string;
    index: number;
    length: number | undefined;
    text: string | undefined;
    author: string;
    origin: {
      alice: number;
      bob: number;
    };
  };
}
