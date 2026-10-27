import { useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { usePlayerStore } from './usePlayerStore';

function PlayerControls({ queueLength }: { queueLength: number }) {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const next = usePlayerStore((state) => state.next);
  const previous = usePlayerStore((state) => state.prev);

  return (
    <div className="player-actions">
      <button type="button" onClick={previous} aria-label="Bài trước">
        ⏮
      </button>
      <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}>
        {isPlaying ? '⏸' : '▶'}
      </button>
      <button type="button" onClick={next} aria-label="Bài sau">
        ⏭
      </button>
      <span>Hàng đợi: {queueLength} bài</span>
    </div>
  );
}

export function PlayerBar() {
  const currentSong = usePlayerStore((state) => state.queue[state.currentIndex]);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const tick = usePlayerStore((state) => state.tick);
  const queueLength = usePlayerStore((state) => state.queue.length);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, tick]);

  return (
    <footer className="player">
      <div>
        <b>{currentSong ? `Đang phát: ${currentSong.title}` : 'Chưa phát bài nào'}</b>
        {currentSong && <small> — {currentSong.artist}</small>}
      </div>
      <ProgressBar />
      <PlayerControls queueLength={queueLength} />
    </footer>
  );
}
