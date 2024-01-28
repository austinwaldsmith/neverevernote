import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

export interface Notebook {
  name: string;
  id: string;
  type: "note" | "notebook";
  children?: Notebook[];
}

const notebookSchema = new Schema<Notebook>(
  {
    name: {},
    id: {},
    type: {},
    children: {},
  },
  {
    timestamps: true,
  }
);

const NotebookModel =
  models?.Notebook || model<Notebook>("Notebook", notebookSchema);

export default NotebookModel;
