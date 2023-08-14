import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { FC, ReactNode, useState } from "react";
import { useSelector } from "react-redux";

interface GuardProps {
  children: ReactNode;
}

const AuthGuard: FC<GuardProps> = (props) => {
  const location = useLocation();
  const auth = useSelector((state: State) => state.isUserLoggedIn);

  const [requestedLocation, setLocation] = useState<string | null>(null);
  if (!auth) {
    if (location.pathname !== requestedLocation) {
      setLocation(location.pathname);
    }
    return <Navigate to="/auth/login" />;
  }
  if (requestedLocation && location.pathname !== requestedLocation) {
    const location = requestedLocation;
    setLocation(null);
    return <Navigate to={location} />;
  }
  return <> {props.children} </>;
};

const GuestGuard: FC<GuardProps> = (props) => {
  const auth = useSelector((state: State) => state.isUserLoggedIn);
  if (auth) {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/auth/login"
          element={
            <GuestGuard>
              <Login />
            </GuestGuard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
