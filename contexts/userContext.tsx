// create context

import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  type: "student" | "teacher";
  email: string;
};
export const UserContext = createContext<{
  user: User;
  setUser: (arg: User) => void;
}>({ user: null, setUser: null });
export const UserProvider = ({ children }) => {
  const router = useRouter();
  const { type } = router.query;
  const [user, setUser] = useState(null);

  const stateHandler = async () => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        getDocs(docRef).then((querySnapshot) => {
          console.log("querySnapshot", querySnapshot);
          if (!querySnapshot.empty) {
            const u = querySnapshot.docs[0].data().type;
            setUser({
              id: querySnapshot.docs[0].id,
              type: u,
              email: querySnapshot.docs[0].data().email,
            });
            router.push(`/dashboard/${u}`);
            return;
          }
        });
      } else {
        router.push("/");
      }
    });
  };
  useEffect(() => {
    stateHandler();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
