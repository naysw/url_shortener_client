import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminGuard from "./components/AdminGuard";
import { UIProvider } from "./components/UIContext/UIContext";
import "./index.css";
import reactQueryClient from "./lib/reactQuery";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <QueryClientProvider client={reactQueryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <Dashboard />
                </AdminGuard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>

      <ToastContainer hideProgressBar />
    </UIProvider>
  );
}

export default App;
