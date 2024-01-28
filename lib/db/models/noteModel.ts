import { Fragment } from "@tiptap/pm/model";
import mongoose, { Schema, model, models } from "mongoose";

export interface Note {
  content: string | Fragment;
  id: string;
  test: string;
}

const noteSchema = new Schema<Note>(
  {
    id: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const NoteModel = models?.Note || model<Note>("Note", noteSchema);

export default NoteModel;
