export interface IMutation {
  author: string;
  origin: {
    alice: number;
    bob: number;
  };
  conversationId: string;
  data: {
    type: string;
    index: number;
    length: number | undefined;
    text: string | undefined;
  };
}
