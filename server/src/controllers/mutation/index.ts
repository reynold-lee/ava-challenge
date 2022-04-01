import { Request, Response } from "express";

import Conversation from "../../models/Conversation";

export const mutation = async (req: Request, res: Response) => {
  try {
    // mutation
    const conversation = await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        text: req.body.text,
        lastMutation: {
          type: req.body.data.type,
          index: req.body.data.index,
          length: req.body.data.length,
          text: req.body.data.text,
          author: req.body.author,
          origin: {
            alice: req.body.origin.alice,
            bob: req.body.origin.bob,
          },
        },
      }
    );

    if (conversation != null) {
      const updateConversation = await conversation.save();

      res.status(201).json({ ok: true, text: updateConversation.text });
    } else {
      res.status(400).json({ ok: false, msg: "Error occurred" });
    }
  } catch (error) {
    throw error;
  }
};
