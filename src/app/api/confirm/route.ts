import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  // URL 쿼리에 필수 파라미터가 없으면 실패 처리
  if (!paymentKey || !orderId || !amount) {
    return NextResponse.redirect(`${new URL(request.url).origin}/fail?message=Missing+parameters`);
  }

  try {
    const defaultSecretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'; // 테스트용 시크릿 키
    // 토스페이먼츠 API 인증을 위한 Basic Auth 토큰 생성 (SecretKey + :)
    const encryptedSecretKey = Buffer.from(`${defaultSecretKey}:`).toString('base64');

    // [면접 핵심 포인트]
    // 프론트엔드가 결제 성공 처리를 받았다고 해도 "진짜로 돈이 빠져나간 상태"가 아닙니다. (Authorization Only)
    // 반드시 백엔드(서버)에서 토스페이먼츠 서버로 `confirm` (승인) 요청을 보내서 200 OK를 받아야만 결제 및 출금이 확정됩니다.
    // 이는 프론트엔드에서 결제 금액(amount)을 조작하여 싸게 결제하는 해킹을 막기 위함입니다.
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount), // 실무에서는 여기서 받은 amount가 DB의 원결제 금액과 일치하는지 검증하는 로직이 필수입니다.
      }),
    });

    if (response.ok) {
      // 결제 승인 완료!
      // 여기서 DB에 "결제 완료" 상태를 업데이트하고, 고객에게 이메일을 발송하는 등의 비즈니스 로직을 처리합니다.
      return NextResponse.redirect(`${new URL(request.url).origin}/success?orderId=${orderId}&amount=${amount}`);
    } else {
      // 토스페이먼츠 서버에서 승인 거절 (카드 한도 초과 등)
      const errorData = await response.json();
      return NextResponse.redirect(`${new URL(request.url).origin}/fail?message=${errorData.message}`);
    }
  } catch {
    return NextResponse.redirect(`${new URL(request.url).origin}/fail?message=Internal+Server+Error`);
  }
}
