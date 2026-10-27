import { describe, expect, it, vi } from 'vitest';
import { withLogger } from './withLogger';

describe('withLogger', () => {
  it('log tên action và state trước/sau trong môi trường dev', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const reducer = withLogger((state: number, action: { type: string; amount: number }) => state + action.amount);
    expect(reducer(1, { type: 'addSong', amount: 2 })).toBe(3);
    expect(log).toHaveBeenCalledWith('addSong', 1, 3);
    log.mockRestore();
  });
});
