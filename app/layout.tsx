/* Components */
import { Providers } from "@/lib/providers";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";
import Sidebar from "./components/Sidebar";
import Page from "./page";
import LoggedOutPage from "./loggedOutPage";
import { Stack } from "@mui/material";
import { fetchNotebooks } from "./actions/fetch-notebooks";

import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default async function RootLayout(props: React.PropsWithChildren) {
  const notebook = await fetchNotebooks();
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={poppins.className}>
            {session ? (
              <Stack
                direction="row"
                alignItems="flex-start"
                sx={{ height: "100vh" }}
              >
                <Sidebar
                  globalNotebook={notebook}
                  // addNotebookToDB={addNotebookToDB}
                  // addNoteToDB={addNoteToDB}
                />
                <main style={{ width: "100%" }}>
                  <Page />
                </main>
                {/* <main className={styles.main}>{props.children}</main> */}
              </Stack>
            ) : (
              <LoggedOutPage />
            )}

            <footer
              className={styles.footer}
              style={{ position: "fixed", bottom: 0 }}
            >
              #Just footer things...
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  );
}
