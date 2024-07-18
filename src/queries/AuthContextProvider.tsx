import { PropsWithChildren, createContext, useContext } from "react";

const initialValue = {};

const AuthContext = createContext(initialValue);
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }: PropsWithChildren) {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
