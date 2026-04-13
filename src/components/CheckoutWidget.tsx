'use client';

import React, { useEffect, useState } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useDesignStore } from '@/store/useDesignStore';

// 토스페이먼츠에서 제공하는 테스트용 클라이언트 키입니다.
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'test_customer_goods_123'; // 실무에서는 DB의 유저 고유 ID를 사용합니다.

export default function CheckoutWidget() {
  const { items } = useDesignStore();
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  
  // 금액은 실제로는 장바구니나 DB에서 가져와야 하지만, 예시이므로 5000원으로 고정합니다.
  const price = 5000;

  useEffect(() => {
    (async () => {
      // 결제 위젯 초기화
      const widget = await loadPaymentWidget(clientKey, customerKey);
      setPaymentWidget(widget);
    })();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) return;

    // 결제 수단 위젯 렌더링
    paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    // 이용 약관 위젯 렌더링
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
  }, [paymentWidget]);

  const handlePayment = async () => {
    try {
      // 결제 요청: 이 함수가 실행되면 토스페이먼츠 결제창이 뜹니다.
      await paymentWidget?.requestPayment({
        orderId: `order_${Math.random().toString(36).substring(2, 10)}`, // 원래는 서버에서 채번해야 안전합니다.
        orderName: '커스텀 굿즈 디자인 인쇄 요청',
        successUrl: `${window.location.origin}/api/confirm`, // 토스페이먼츠가 결제 '성공 허가'를 내주면 무조건 서버 단으로 리다이렉트되어야 함.
        failUrl: `${window.location.origin}/fail`,       // 실패 시 리다이렉트 될 URL
        customerEmail: 'customer123@gmail.com',          // 고객 이메일
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      });
    } catch (error) {
      console.error('결제 요청 에러:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl mt-8 mb-16 border border-gray-200">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-extrabold text-gray-800">디자인 결제하기 💸</h2>
        <p className="text-gray-500 text-sm mt-1">완성된 디자인(레이어 {items.length}개)을 실물로 받아보세요.</p>
      </div>

      <div id="payment-widget" />
      <div id="agreement" />

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white font-bold py-4 mt-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        {price.toLocaleString()}원 결제하기
      </button>
    </div>
  );
}