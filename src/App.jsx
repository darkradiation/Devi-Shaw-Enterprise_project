import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Customers from "./pages/Customers";
import RoutesPage from "./pages/Routes";
import Orders from "./pages/Orders";
import Stock from "./pages/Stock";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Schemes from "./pages/Schemes";
import ProtectedRoute from "./ui/ProtectedRoute";
import Suppliers from "./pages/Suppliers";
import StockHistory from "./pages/StockHistory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="customers" element={<Customers />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="stock" element={<Stock />} />
              <Route path="schemes" element={<Schemes />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="stock_history" element={<StockHistory />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxLines: "500px",
              padding: "10px 15px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              boxShadow: "var(--shadow-md)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
