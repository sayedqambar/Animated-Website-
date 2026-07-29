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

    gsap.set("#nav, #hero-footer > a, #hero-footer .circle", {
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


function mousemoveFollower() {
    const minicircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function (dets) {
        minicircle.style.transform = `translate(${dets.clientX - 5}px, ${dets.clientY - 5}px)`;
    });
}

mousemoveFollower();
firstpageAnim();
