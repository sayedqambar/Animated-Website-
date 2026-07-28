const heroTimeline = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

heroTimeline
  .from('#nav a, #nav h4', { y: -20, opacity: 0, stagger: 0.1 })
  .from('#header .boundingelem', { y: 80, opacity: 0, stagger: 0.15 }, '-=0.6')
  .from('#chotuheading .boundingelem', { y: 40, opacity: 0, stagger: 0.1 }, '-=0.6')
  .from('#hero-footer a, #circleIcon .circle', { y: 40, opacity: 0, stagger: 0.1 }, '-=0.6');

