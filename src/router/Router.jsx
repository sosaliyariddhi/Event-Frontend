import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as AppRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import RoutesArray from "./app";
import Error from "@page/Error404/PageNotFound";
import Header from "@component/Header/Header";
import Footer from "@component/Footer/Footer";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Router = ({ user, refetch }) => {
  return (
    <AppRouter>
      <Suspense fallback={<h1>Loading...!</h1>}>
        <Header />
        <div className="min-h-[80vh]">
          <Routes>
            {RoutesArray?.map((res, i) => {
              switch (res?.type) {
                case "unauth":
                  return (
                    <Route
                      key={"route" + i}
                      path={res?.path}
                      Component={res?.component}
                      exact={true}
                    />
                  );
                case "auth":
                  return (
                    <Route
                      key={"route" + i}
                      path={res?.path}
                      element={<Auth Component={res?.component} />}
                      exact={true}
                    />
                  );
                  break;
                case "admin":
                  return (
                    <Route
                      key={"route" + i}
                      path={res?.path}
                      element={<AdminAuth Component={res?.component} />}
                      exact={true}
                    />
                  );
                  break;
                default:
                  return <Route path="*" element={<Error />} />;
              }
            })}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>

        <Footer />
      </Suspense>
    </AppRouter>
  );
};

export default Router;

function AdminAuth({ Component }) {
  const [{ user, token }, setCookies, removeCookies] = useCookies([
    "token",
    "user",
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.userType !== "admin") {
      removeCookies("token");
      removeCookies("user");
      navigate("/");
      toast.error("You are not authenticated to access this page");
    }
  });

  return <Component />;
}
function Auth({ Component }) {
  const [{ user, token }] = useCookies(["token", "user"]);
  console.log("🚀 ~ Auth ~ token:", token)
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("Please login to access this page");
    }
  });

  return <Component />;
}
