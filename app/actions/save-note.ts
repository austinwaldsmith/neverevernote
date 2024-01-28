"use server";

import NoteModel from "@/lib/db/models/noteModel";
import { Fragment } from "@tiptap/pm/model";
import { addNoteToDB } from "./add-note";

export async function saveNoteToDB(id: string, content: string | Fragment) {
  const noteExists = await NoteModel.findOne({ id });

  if (!noteExists) {
    addNoteToDB(id);
  }

  const updatedNote = await NoteModel.updateOne({ id }, { $set: { content } });
}
