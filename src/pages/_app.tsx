import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";
import { ReactNode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (token) {
      dispatch(setToken({ token, name: name || "name", userId: userId || "" }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default MyApp;
