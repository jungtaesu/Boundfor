'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react'; // 추가
import { useDesignStore } from '@/store/useDesignStore';
import CheckoutWidget from './CheckoutWidget';

/**
 * [가장 중요한 면접 포인트]
 * React Konva는 내부적으로 HTML Canvas API와 window 객체에 의존합니다.
 * Next.js 서버에서 렌더링을 시도하면 에러가 발생하므로, ssr: false로 동적 임포트합니다.
 */
const DynamicCanvas = dynamic(() => import('./Canvas'), { ssr: false });

export default function Editor() {
  const { items } = useDesignStore();
  const { status } = useSession(); // 로그인 상태 확인

  // 로그인을 안했으면 흐리게(블러) 처리해버리기 위한 조건식
  const isBlurred = status !== 'authenticated';

  return (
    <div className="flex flex-col items-center gap-6 p-8 min-h-screen bg-gray-50 overflow-hidden relative">
      {isBlurred && (
         <div className="absolute inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center border-2 border-blue-500">
               <div className="text-5xl mb-4">🔒</div>
               <h2 className="text-xl font-extrabold text-gray-800 mb-2">프리미엄 에디터 잠김</h2>
               <p className="text-gray-500">우측 상단의 `시작하기`를 눌러 로그인해주세요.</p>
            </div>
         </div>
      )}
      
      <div className={`transition-all duration-300 w-full flex flex-col items-center ${isBlurred ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">굿즈 디자인 에디터 🎨</h1>
          <p className="text-gray-500">도형과 글자를 마음껏 드래그해보세요!</p>
        </div>
        
        <DynamicCanvas />

        <div className="mt-6 w-full max-w-2xl bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-hidden whitespace-pre-wrap">
          <span className="text-gray-400 block mb-2">{"// 현재 Canvas의 객체 상태 (Zustand Store)"}</span>
          {JSON.stringify(items, null, 2)}
        </div>

        <CheckoutWidget />
      </div>
    </div>
  );
}