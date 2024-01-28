"use server";

import { revalidatePath } from "next/cache";
import NoteModel, { Note } from "@/lib/db/models/noteModel";
import { NextRequest } from "next/server";
import { NextApiResponse } from "next";

export async function handler(req: NextRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const id = req.nextUrl.searchParams.get("id");
      console.log("get ", id);
    default:
      console.log("default");
  }
  console.log(req.nextUrl.searchParams.get("id"));
  // const id = searchParams.get("id");
  // const DBNote = await NoteModel.findOne({ id });
  // console.log(searchParams);

  // if (!!DBNote) {
  //   return DBNote;
  // }

  // const newDBNote = await NoteModel.create({
  //   name: "global",
  //   id: "global",
  //   type: "notebook",
  //   children: [],
  // });
  // return newDBNote;
}
