'use client';
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // 클라이언트 컴포넌트 환경에서 useSession 훅을 사용할 수 있도록 감싸주는 Provider 입니다.
  return <SessionProvider>{children}</SessionProvider>;
}