import { createContext, useContext, useEffect, useState } from "react";

interface User {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: Claim[];
}

interface Claim {
  typ: string;
  val: string;
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
    
    async function getUserInfo(){
      try {
        const { clientPrincipal } = await fetch("/.auth/me").then(
          (resp) => resp.json() as unknown as { clientPrincipal: User }
        );
        setUser(clientPrincipal);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    }

    (async () => { await getUserInfo(); })();

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <>{children}</>
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside of UserProfile element.");
  }
  return ctx;
}

export function getUser() {
  const ctx = useUser();
  let user = null;
  if (ctx.user)
    user = ctx.user;

  return user;
}

export function getUserName(user: User | null){
  const claims = user?.claims;
  let name = undefined;
  if (claims){
    for (const claim of claims){
      if (claim.typ === "name"){
        name = claim.val;
      }
    }
  }
  return name ? name : null;
}