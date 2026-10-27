import { formatDuration } from '../../utils/format';
import { usePlayerStore } from './usePlayerStore';

export function ProgressBar() {
  const position = usePlayerStore((state) => state.position);
  const duration = usePlayerStore((state) => state.queue[state.currentIndex]?.duration ?? 0);

  return (
    <div className="progress-wrap">
      <span>{formatDuration(position)}</span>
      <progress max={duration || 1} value={position} aria-label="Tiến trình bài hát" />
      <span>{formatDuration(duration)}</span>
    </div>
  );
}
