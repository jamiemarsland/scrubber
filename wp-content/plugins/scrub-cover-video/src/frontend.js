(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  function init(el){
    const video = el.querySelector('video');
    if (!video) return;

    const ensureReady = () => new Promise((res) => {
      if (!isNaN(video.duration) && video.duration > 0) return res();
      video.addEventListener('loadedmetadata', res, { once:true });
    });

    ensureReady().then(() => {
      if (!window.gsap || !window.ScrollTrigger) return; // safety
      window.gsap.registerPlugin(window.ScrollTrigger);

      const getDur = () => video.duration || 1;

      // Optional: pause video so native playback doesn't fight us
      try { video.pause(); } catch(e){}

      window.ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const t = self.progress * getDur();
          if (!Number.isNaN(t)) video.currentTime = t;
        }
      });
    });
  }

  ready(() => {
    document.querySelectorAll('[data-scrub-video="true"]').forEach(init);
  });
})();
