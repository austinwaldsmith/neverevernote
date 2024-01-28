/* Components */
import { Box } from "@mui/material";
import TextArea from "./components/TextArea";
import { connectDB } from "@/lib/db/db";

export default async function IndexPage() {
  connectDB();

  return (
    <Box>
      <TextArea />
    </Box>
  );
}

export const metadata = {
  title: "NeverEverNote",
};
