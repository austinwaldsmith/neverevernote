"use server";

import NotebookModel, { Notebook } from "@/lib/db/models/notebookModel";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/options";

export async function addNotebookToDB(result: Notebook) {
  const session = await getServerSession(authOptions);

  const updatedNB = await NotebookModel.replaceOne(
    { id: session?.user?.email },
    result
  );
  revalidatePath("/");
}
