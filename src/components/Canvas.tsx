'use client';

import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { useDesignStore } from '../store/useDesignStore';

export default function Canvas() {
  const { items, updateItemPosition } = useDesignStore();

  return (
    <div className="border border-gray-300 w-full max-w-2xl bg-white shadow-xl overflow-hidden rounded-lg">
      <Stage width={600} height={400}>
        <Layer>
          {items.map((item) => {
            if (item.type === 'rect') {
              return (
                <Rect
                  key={item.id}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  fill={item.fill}
                  draggable // Konva에서 드래그 가능 속성 활성화
                  onDragEnd={(e) => {
                    // 드래그가 끝나는 순간 Zustand의 전역 상태(좌표)를 업데이트함
                    updateItemPosition(item.id, e.target.x(), e.target.y());
                  }}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'grab';
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'default';
                  }}
                />
              );
            }
            if (item.type === 'text') {
              return (
                <Text
                  key={item.id}
                  x={item.x}
                  y={item.y}
                  text={item.text}
                  fill={item.fill}
                  fontSize={24}
                  fontFamily="sans-serif"
                  fontStyle="bold"
                  draggable
                  onDragEnd={(e) => {
                    updateItemPosition(item.id, e.target.x(), e.target.y());
                  }}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'grab';
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'default';
                  }}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
}