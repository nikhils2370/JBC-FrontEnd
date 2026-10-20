import "../globals.css";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Jai Bhawani Computer Education Centre | JBC",
  description:
    "Jai Bhawani Computer Education Centre - RKCL, RS-CIT, Tally Prime, Graphic Design and Advanced Computer Courses.",
  keywords: [
    "JBC",
    "Jai Bhawani Computer Education Centre",
    "RKCL",
    "RS-CIT",
    "Tally Prime",
    "Computer Education",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
