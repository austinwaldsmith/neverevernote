/* Components */
import { Providers } from "@/lib/providers";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";
import LoggedOutPage from "./loggedOutPage";
import LoggedInPage from "./loggedInPage";

import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default async function RootLayout(props: React.PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={poppins.className}>
            {session ? <LoggedInPage session={session} /> : <LoggedOutPage />}

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
