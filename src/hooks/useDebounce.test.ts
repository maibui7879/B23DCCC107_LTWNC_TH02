import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';
describe('useDebounce', () => {
  it('giữ giá trị cũ trước 300ms và cập nhật sau đó', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: 'cũ' } });
    rerender({ value: 'mới' });
    expect(result.current).toBe('cũ');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('mới');
    vi.useRealTimers();
  });
});
