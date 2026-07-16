import { useEffect } from 'react';

export const useTimeline = () => {
  useEffect(() => {
    const timeline = document.getElementById('timeline');
    const timelineFill = document.getElementById('timelineFill');

    if (!timeline || !timelineFill) return;

    function updateTimeline() {
      const rect = timeline!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
      const pct = Math.min(visible / total, 1) * 100;
      (timelineFill as HTMLElement).style.height = pct + '%';
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline();

    return () => {
      window.removeEventListener('scroll', updateTimeline);
      window.removeEventListener('resize', updateTimeline);
    };
  }, []);
};
