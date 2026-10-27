import { formatDuration } from '../../utils/format';
export const ProgressBar = ({ position, duration }: { position: number; duration: number }) => <div className="progress-wrap"><span>{formatDuration(position)}</span><progress max={duration || 1} value={position} aria-label="Tiến trình bài hát" /><span>{formatDuration(duration)}</span></div>;
