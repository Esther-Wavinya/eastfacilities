import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loadingSDK, setLoadingSDK] = useState(true);
  const [user, setUser] = useState(null);

  // Optional: preload SDKs here
  useEffect(() => {
    const loadSDKs = async () => {
      try {
        // Example for Google
        if (window.gapi) {
          await window.gapi.load("auth2", () => {
            window.gapi.auth2.init({
              client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            });
          });
        }
        // Example for Facebook
        if (window.FB) {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: false,
            version: "v15.0",
          });
        }
        // Apple usually uses popup + redirect flow, no SDK to preload unless using Apple JS SDK
      } catch (err) {
        console.error("Error loading SDKs", err);
      } finally {
        setLoadingSDK(false);
      }
    };
    loadSDKs();
  }, []);

  // Utility: save token & optionally decode user
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    // Optional: decode user info if your token is JWT
    setUser({}); // or decode with jwt-decode(token)
    return { token };
  };

  // Google Login
  const loginWithGoogle = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const idToken = googleUser.getAuthResponse().id_token;
    const res = await authApi.socialLogin("google", idToken);
    return saveToken(res.data.token);
  };

  // Facebook Login
  const loginWithFacebook = async () => {
    return new Promise((resolve, reject) => {
      window.FB.login(
        async (response) => {
          if (response.authResponse) {
            try {
              const fbToken = response.authResponse.accessToken;
              const res = await authApi.socialLogin("facebook", fbToken);
              resolve(saveToken(res.data.token));
            } catch (err) {
              reject(err);
            }
          } else {
            reject(new Error("Facebook login cancelled"));
          }
        },
        { scope: "email" }
      );
    });
  };

  // Apple Login (example using redirect)
  const loginWithApple = async () => {
    // If using Apple JS SDK:
    // window.AppleID.auth.signIn().then(...).catch(...)
    // For now assume you already have a popup to get id_token
    const idToken = await getAppleIdToken(); // implement your popup/redirect
    const res = await authApi.socialLogin("apple", idToken);
    return saveToken(res.data.token);
  };

  // Regular logout
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error (ignored)", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingSDK,
        loginWithGoogle,
        loginWithFacebook,
        loginWithApple,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
