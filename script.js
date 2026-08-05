const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
});

function firstpageAnim() {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(".boundingelem", {
        y: "100%",
        opacity: 0
    });

    // Don't animate #nav (keep it visible); animate only hero footer items
    gsap.set("#hero-footer > a, #hero-footer .circle", {
        y: 24,
        opacity: 0
    });

    tl.from("#nav", {
        y: -16,
        opacity: 0,
        duration: 0.8
    })
        .to(".boundingelem", {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12
        }, "-=0.35")
        .to("#hero-footer > a", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1
        }, "-=0.45")
        .to("#hero-footer .circle", {
            y: 0,
            opacity: 1,
            duration: 0.7,
            scale: 1,
            stagger: 0.08
        }, "-=0.35");
}

function mouseSkew() {
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function (dets) {

        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        // Clamp value between 0.8 and 1.2
        xscale = gsap.utils.clamp(0.6, 1.5, 1 + xdiff * 0.04);
        yscale = gsap.utils.clamp(0.6, 1.5, 1 + ydiff * 0.04);

        mousemoveFollower(xscale, yscale);
    });
}

function mousemoveFollower(xscale = 1, yscale = 1) {
    const minicircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function (dets) {

        minicircle.style.transform = `
            translate(${dets.clientX - 5}px, ${dets.clientY - 5}px)
            scale(${xscale}, ${yscale})
        `;

        clearTimeout(minicircle.timer);

        minicircle.timer = setTimeout(() => {
            minicircle.style.transform = `
                translate(${dets.clientX - 5}px, ${dets.clientY - 5}px)
                scale(1,1)
            `;
        }, 100);

    });
}

function imageHoverEffect() {

    document.querySelectorAll(".elem").forEach(function (elem) {

        let rotate = 0;
        let prevX = 0;
        let prevY = 0;

        const img = elem.querySelector("img");
        if (!img) return;

        // Helper to animate image to coordinates relative to the element
        function showAt(clientX, clientY, inputDiffX, inputDiffY) {
            const rect = elem.getBoundingClientRect();
            const left = clientX - rect.left;
            const top = clientY - rect.top;

            // rotate based on horizontal movement (and clamp)
            rotate = gsap.utils.clamp(-20, 20, inputDiffX);

            gsap.to(img, {
                opacity: 1,
                left: left + 'px',
                top: top + 'px',
                rotate: rotate,
                duration: 0.22,
                ease: "power3.out"
            });
        }

        function hideImg() {
            gsap.to(img, { opacity: 0, duration: 0.35 });
        }

        // If the device supports fine pointer (mouse/trackpad), use mousemove as before
        if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
            elem.addEventListener("mousemove", function (dets) {
                const diff = dets.clientX - prevX;
                prevX = dets.clientX;
                prevY = dets.clientY;
                showAt(dets.clientX, dets.clientY, diff, dets.clientY - prevY);
            });

            elem.addEventListener("mouseleave", function () {
                hideImg();
            });
        } else {
            // Touch devices: use touch events so users can still see the image animation while touching
            let lastTouchX = 0;
            elem.addEventListener('touchstart', function (ev) {
                const t = ev.touches[0];
                lastTouchX = t.clientX;
                prevY = t.clientY;
                showAt(t.clientX, t.clientY, 0, 0);
            }, { passive: true });

            elem.addEventListener('touchmove', function (ev) {
                const t = ev.touches[0];
                const diff = t.clientX - lastTouchX;
                lastTouchX = t.clientX;
                showAt(t.clientX, t.clientY, diff, t.clientY - prevY);
                prevY = t.clientY;
            }, { passive: true });

            elem.addEventListener('touchend', function () {
                hideImg();
            }, { passive: true });
        }

    });

}

firstpageAnim();

// Enable image hover/touch effects on all devices (function internally attaches mouse or touch handlers)
imageHoverEffect();

// Only enable mouse-driven follower/skew on devices with a fine pointer (mouse/trackpad).
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    mousemoveFollower();
    mouseSkew();
} else {
    // On touch devices, hide the custom cursor
    const minicircle = document.querySelector('#minicircle');
    if (minicircle) minicircle.style.display = 'none';
}
