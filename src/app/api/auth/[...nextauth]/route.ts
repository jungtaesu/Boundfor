import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // 1. 실제 소셜 로그인 (GitHub)
    GithubProvider({
      clientId: process.env.GITHUB_ID || "GITHUB_CLIENT_ID",
      clientSecret: process.env.GITHUB_SECRET || "GITHUB_CLIENT_SECRET",
    }),
    
    // 2. 소셜 키 발급 전, 원활한 면접용/테스트용 빠른 로그인을 위한 가짜(Mock) 로그인
    CredentialsProvider({
      name: "테스트 계정으로 로그인",
      credentials: {
        username: { label: "이름 (아무거나)", type: "text", placeholder: "김토스" },
      },
      async authorize(credentials) {
        if (credentials?.username) {
          // 면접 어필용: 비밀번호 검증 없이 무조건 로그인 성공 처리
          return { id: "1", name: credentials.username, email: `${credentials.username}@test.com` };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "super-secret-mock-key-for-dev",
});

export { handler as GET, handler as POST };
