import { useEffect } from 'react';

export const useCountUp = () => {
  useEffect(() => {
    function animateCount(el: HTMLElement) {
      const target = parseInt(el.dataset.count!, 10);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();

      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    function formatLakh(n: number): string {
      let s = String(n);
      let last3 = s.slice(-3);
      let rest = s.slice(0, -3);
      if (rest !== '') last3 = ',' + last3;
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      return rest + last3;
    }

    function animateLakh(el: HTMLElement) {
      const lakhs = parseInt(el.dataset.lakh || el.dataset.lakhBig || '0', 10);
      const target = lakhs * 100000;
      const dur = 1600;
      const start = performance.now();

      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = formatLakh(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    const countEls = document.querySelectorAll('[data-count]');
    const lakhEls = document.querySelectorAll('[data-lakh]');
    const lakhBigEls = document.querySelectorAll('[data-lakh-big]');

    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            if (el.dataset.count) animateCount(el);
            else if (el.dataset.lakh) animateLakh(el);
            else if (el.dataset.lakhBig) animateLakh(el);
            countIo.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    countEls.forEach((el) => countIo.observe(el));
    lakhEls.forEach((el) => countIo.observe(el));
    lakhBigEls.forEach((el) => countIo.observe(el));

    return () => {
      countEls.forEach((el) => countIo.unobserve(el));
      lakhEls.forEach((el) => countIo.unobserve(el));
      lakhBigEls.forEach((el) => countIo.unobserve(el));
    };
  }, []);
};
