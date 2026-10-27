import { describe, expect, it } from 'vitest'; import { formatDuration } from './format';
describe('formatDuration', () => { it('định dạng 0 giây', () => expect(formatDuration(0)).toBe('0:00')); it('định dạng 65 giây', () => expect(formatDuration(65)).toBe('1:05')); it('định dạng 300 giây', () => expect(formatDuration(300)).toBe('5:00')); });
