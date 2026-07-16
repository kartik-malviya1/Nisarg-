import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));

    return () => {
      revealEls.forEach((el) => io.unobserve(el));
    };
  }, []);
};
