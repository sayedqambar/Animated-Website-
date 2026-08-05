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

        elem.addEventListener("mousemove", function (dets) {

            const img = elem.querySelector("img");

            let diff = dets.clientX - prevX;
            prevX = dets.clientX;

            rotate = gsap.utils.clamp(-20, 20, diff);

            // 👇 Put this here
            gsap.to(img, {
                opacity: 1,
                left: dets.offsetX,
                top: dets.offsetY,
                rotate: rotate,
                duration: 0.25,
                ease: "power3.out"
            });

        });

        elem.addEventListener("mouseleave", function () {

            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: 0.4
            });

        });

    });

}

mousemoveFollower();
mouseSkew();
firstpageAnim();
imageHoverEffect();
