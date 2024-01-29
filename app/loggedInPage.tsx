import React from "react";
import { fetchNotebooks } from "./actions/fetch-notebooks";
import { Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Page from "./page";
import { Session } from "next-auth";

interface loggedInPageProps {
  session: Session | null;
}
export default async function loggedInPage({ session }: loggedInPageProps) {
  const notebook = await fetchNotebooks();
  console.log(session);

  return (
    <Stack direction="row" alignItems="flex-start" sx={{ height: "100vh" }}>
      <Sidebar globalNotebook={notebook} />
      <main style={{ width: "100%" }}>
        <Page />
      </main>
    </Stack>
  );
}
