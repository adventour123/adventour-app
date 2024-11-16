import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../context/authContext";
import DataProvider from "../context/dataContext";
import "./globals.css";
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <AuthProvider>{children}</AuthProvider>
        </DataProvider>
      </body>
    </html>
  );
}
