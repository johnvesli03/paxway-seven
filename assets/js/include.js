/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    const btn = document.querySelector('.icon-btn');
    if (!nav) return;

    nav.classList.toggle('open');
    if (btn) btn.classList.toggle('is-open');
}


/* =========================================================
   LOAD HEADER PARTIAL
========================================================= */
function loadHeader() {
    fetch("partials/header.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;

            // Mark active nav link
            const path = window.location.pathname.split("/").pop() || "index.html";
            document.querySelectorAll(".nav a, .mobile-nav a").forEach(a => {
                const href = a.getAttribute("href");
                if (href === path || (path === "" && href === "index.html")) {
                    a.classList.add("active");
                }
            });

            // Re-attach toggle event
            const btn = document.querySelector('.icon-btn');
            if (btn && !btn.getAttribute('onclick')) {
                btn.addEventListener('click', toggleMobileNav);
            }
        })
        .catch(err => console.error("Header load error:", err));
}


/* =========================================================
   LOAD FOOTER PARTIAL
========================================================= */
function loadFooter() {
    fetch("partials/footer.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(err => console.error("Footer load error:", err));
}


/* =========================================================
   MESH CANVAS ANIMATION
========================================================= */
function initMeshCanvas() {
    const canvas = document.getElementById('mesh-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const CFG = {
        nodeCount: 64,
        maxDist: 165,
        nodeRadius: 2.1,
        speed: 0.17,
        lineAlpha: 0.17,
        dotAlpha: 0.26,
        lineColor: '75, 108, 175',
        dotColor: '55, 90, 165',
    };

    let W, H, nodes;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        buildNodes();
    }

    function buildNodes() {
        nodes = Array.from({ length: CFG.nodeCount }, () => {
            const r = Math.random();
            let x;
            if (r < 0.38) x = Math.random() * W * 0.28;
            else if (r < 0.72) x = W * 0.72 + Math.random() * W * 0.28;
            else x = W * 0.16 + Math.random() * W * 0.68;

            return {
                x,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * CFG.speed,
                vy: (Math.random() - 0.5) * CFG.speed,
            };
        });
    }

    function tick() {
        ctx.clearRect(0, 0, W, H);

        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x < -20) n.x = W + 20;
            if (n.x > W + 20) n.x = -20;
            if (n.y < -20) n.y = H + 20;
            if (n.y > H + 20) n.y = -20;
        }

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d > CFG.maxDist) continue;

                const alpha = CFG.lineAlpha * (1 - d / CFG.maxDist);

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${CFG.lineColor},${alpha.toFixed(3)})`;
                ctx.lineWidth = 0.75;
                ctx.stroke();
            }
        }

        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, CFG.nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CFG.dotColor},${CFG.dotAlpha})`;
            ctx.fill();
        }

        requestAnimationFrame(tick);
    }

    new ResizeObserver(resize).observe(canvas);
    resize();
    tick();
}


/* =========================================================
   STATS COUNTER
========================================================= */
function initStatsCounter() {
    const counters = document.querySelectorAll(".counter");
    const cards = document.querySelectorAll(".stat-card");
    if (!counters.length) return;

    let started = false;

    function animateCounter(counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            counter.innerText = Math.floor(progress * target) + "+";
            if (progress < 1) requestAnimationFrame(update);
            else counter.innerText = target + "+";
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("visible");
                        animateCounter(card.querySelector(".counter"));
                    }, index * 300);
                });
                started = true;
            }
        });
    }, { threshold: 0.4 });

    if (document.querySelector(".stats-grid")) {
        observer.observe(document.querySelector(".stats-grid"));
    }
}


/* =========================================================
   INIT EVERYTHING AFTER DOM LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initMeshCanvas();
    initStatsCounter();
});