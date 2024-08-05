import { Inter } from "next/font/google";
import "../scss/index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Purrfect Pix",
  description: "Tons of cute cats to look at!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
