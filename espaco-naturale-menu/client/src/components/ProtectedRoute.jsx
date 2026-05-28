import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api.js";
import { removeToken } from "../utils/auth.js";
import Loading from "./Loading.jsx";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    api
      .me()
      .then(() => setStatus("allowed"))
      .catch(() => {
        removeToken();
        setStatus("denied");
      });
  }, []);

  if (status === "checking") {
    return (
      <main className="min-h-screen p-5">
        <Loading label="Validando acesso..." />
      </main>
    );
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
