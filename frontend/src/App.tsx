import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { FC, ReactNode, useState } from "react";

interface GuardProps {
  children: ReactNode;
  auth: boolean
}

const AuthGuard: FC<GuardProps> = (props) => {
  const location = useLocation();
  const [requestedLocation, setLocation] = useState<string | null>(null);
  if (!props.auth) {
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
  if (props.auth) {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
};

function App() {
const [auth, setAuth] = useState(false)
const handleAuth = () => {
  setAuth(() => true)
}

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard auth={auth}>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/auth/login"
          element={
            <GuestGuard auth={auth}>
              <Login setAuth={handleAuth} />
            </GuestGuard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
