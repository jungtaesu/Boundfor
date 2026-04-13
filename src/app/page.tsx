import Editor from '@/components/Editor';
import AuthHeader from '@/components/AuthHeader'; // 추가

export default function Home() {
  return (
    <main>
      <AuthHeader />
      <Editor />
    </main>
  );
}