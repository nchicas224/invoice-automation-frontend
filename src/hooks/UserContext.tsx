import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userId: string;
  principal: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProfile({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser({
      userId: "1",
      principal: "test@test.com",
      name: "Tester A1",
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>{children}</>
    </UserContext.Provider>
  );
}

export function useUser(){
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside of UserProfile element.');
  }
  return ctx;
}
