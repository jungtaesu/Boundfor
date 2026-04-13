import Link from 'next/link';

export default function SuccessPage({ searchParams }: { searchParams: { orderId: string; amount: string } }) {
  // 서버로부터 전달받은 정상적인 결제 승인 쿼리가 존재하는지 확인
  const isPaid = searchParams.orderId && searchParams.amount;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        {isPaid ? (
          <>
            <span className="text-5xl mb-4 inline-block">🎉</span>
            <h1 className="text-2xl font-bold text-green-600">결제가 완료되었습니다!</h1>
            <div className="mt-6 text-sm text-gray-600 bg-gray-100 p-4 rounded text-left">
              <p>주문 번호: <span className="font-mono">{searchParams.orderId}</span></p>
              <p>결제 금액: <span className="font-mono text-blue-600">{Number(searchParams.amount).toLocaleString()}원</span></p>
            </div>
            
            <p className="mt-4 text-sm">
              방금 디자인하신 굿즈가 제작 모드로 전환됩니다. (토이 프로젝트입니다!)
            </p>
          </>
        ) : (
          <>
            <span className="text-5xl mb-4 inline-block">🚫</span>
            <h1 className="text-xl font-bold text-red-600">잘못된 접근입니다.</h1>
          </>
        )}
        <Link href="/" className="mt-8 block bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}