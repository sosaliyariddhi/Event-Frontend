import Router from "./router/Router";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/app";
export default function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={store}>
        <Router />
        <ToastContainer />
      </Provider>
    </CookiesProvider>
  );
}
