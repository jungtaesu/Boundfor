import { create } from 'zustand';

export type DesignItem = {
  id: string;
  type: 'rect' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill?: string;
  text?: string;
};

interface DesignStore {
  items: DesignItem[];
  updateItemPosition: (id: string, x: number, y: number) => void;
}

export const useDesignStore = create<DesignStore>((set) => ({
  // 초기 캔버스 데이터 (서버에서 가져온 데이터로 가정할 수 있음)
  items: [
    { id: 'box1', type: 'rect', x: 50, y: 50, width: 100, height: 100, fill: '#3b82f6' },
    { id: 'text1', type: 'text', x: 200, y: 150, text: '안녕하세요! 드래그 해보세요.', fill: '#1f2937' },
  ],
  
  // 객체의 드래그가 끝났을 때 좌표 상태를 업데이트하는 함수
  updateItemPosition: (id, x, y) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, x, y } : item
    ),
  })),
}));