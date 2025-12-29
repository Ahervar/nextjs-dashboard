'use client';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const setAuth = useStore((state) => state.setAuth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // @ts-ignore
      setAuth(session.user.accessToken || session.user.token, session.user);
      
      // Redirect to dashboard if on login page
      if (pathname === '/login') {
        router.push('/dashboard/users');
      }
    } 
  }, [session, status, setAuth, router, pathname]);

  return null;
}