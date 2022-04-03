export type MutationType = {
  conversationId: string;
  text: string;
  author: string;
  origin: {
    alice: number;
    bob: number;
  };
  data: {
    type: string;
    index: number;
    length: number;
    text: string;
  };
};
