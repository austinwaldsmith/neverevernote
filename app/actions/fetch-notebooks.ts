"use server";

import NotebookModel, { Notebook } from "@/lib/db/models/notebookModel";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function fetchNotebooks() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const DBNotebook = await NotebookModel.findOne({ id: session?.user?.email });

  if (!!DBNotebook) {
    return DBNotebook;
  }

  const newDBNotebook = await NotebookModel.create({
    name: "global",
    id: session?.user?.email,
    type: "notebook",
    children: [],
  });

  return newDBNotebook;

  // if(newDBNotebook){

  //   return {notebook:newDBNotebook, status: "success"};
  // } else:
  // return {notebook: {}, status: "failed"}
}
