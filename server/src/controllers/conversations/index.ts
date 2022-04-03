import { Request, Response } from "express";

import { IConversation } from "../../types/Conversation";
import Conversation from "../../models/Conversation";

export const getConversations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const conversations: IConversation[] = await Conversation.find();

    res.status(200).json({ ok: true, conversations: conversations });
  } catch (error) {
    throw error;
  }
};

export const addConversation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const request: IConversation = await req.body;

    const conversation = new Conversation(request);

    conversation.id = Date.now();

    const newConversation = await conversation.save();

    res.status(201).json(newConversation);
  } catch (error) {
    throw error;
  }
};

export const deleteConversation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = await req.params;

    const conversation = await Conversation.findOneAndDelete({ id: id });
    res.status(200).json(conversation);
  } catch (error) {
    throw error;
  }
};
