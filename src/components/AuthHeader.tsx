'use client';
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthHeader() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-12 w-full bg-gray-900 animate-pulse" />;
  }

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg w-full sticky top-0 z-50">
      <div className="font-bold text-xl tracking-tight">테스트</div>
      
      <div>
        {session && session.user ? (
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              <span className="text-blue-400">{session.user.name}</span>님, 환영합니다!
            </div>
            <button 
              onClick={() => signOut()} 
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="px-5 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
          >
            시작하기 (로그인)
          </button>
        )}
      </div>
    </div>
  );
}