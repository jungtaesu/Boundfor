import Link from 'next/link';

export default function FailPage({ searchParams }: { searchParams: { message: string } }) {
  // 토스페이먼츠 에러 메시지
  const errorMessage = searchParams.message || '알 수 없는 에러가 발생했습니다.';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md border-t-8 border-red-500 max-w-sm w-full text-center">
        <span className="text-5xl mb-4 inline-block">❌</span>
        <h1 className="text-2xl font-bold text-red-600">결제에 실패했습니다</h1>
        
        <div className="mt-6 text-sm text-red-800 bg-red-50 p-4 rounded text-left font-mono">
          <p>{decodeURIComponent(errorMessage)}</p>
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          카드 한도, 잔액 부족 또는 사용자가 결제를 취소했을 수 있습니다.
        </p>

        <Link href="/" className="mt-8 block bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition-colors">다시 시도하기</Link>
      </div>
    </div>
  );
}