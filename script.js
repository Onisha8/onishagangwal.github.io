// Onisha Gangwal portfolio: the career mandala, the dateline and the resume link.

// Career chapters, innermost ring first. `results` = documented outcomes from that chapter
// (resume bullets and shipped projects); each result is drawn as four petals.
const CHAPTERS = [
    { years: '2019–20', title: 'Assistant Systems Engineer, TCS', results: 3, style: 'leaf' },
    { years: '2020–22', title: 'Systems Engineer, TCS', results: 4, style: 'arch' },
    { years: '2022–24', title: 'Senior Associate Consultant, Infosys', results: 5, style: 'leaf' },
    { years: '2024–26', title: 'MS AI & Business Analytics + Graduate Assistant, USF', results: 2, style: 'tear' },
    { years: '2025–26', title: 'Independent AI & analytics projects', results: 6, style: 'arch' }
];

const SVG_NS = 'http://www.w3.org/2000/svg';

document.addEventListener('DOMContentLoaded', function() {
    drawMandala();
    setDateline();
    addResumeLink();

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

// ---------- Fig. 1: the career mandala ----------
function drawMandala() {
    const svg = document.getElementById('mandala');
    const list = document.getElementById('chapters');
    if (!svg || !list) return;

    const core = 26;
    const outer = 238;
    const band = (outer - core) / CHAPTERS.length;

    // Centre: a small rosette for where it started
    const centre = el('g', { class: 'centre' });
    centre.appendChild(el('circle', { r: core - 6, class: 'draw', pathLength: 1 }));
    centre.appendChild(el('circle', { r: 4, class: 'dot' }));
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        centre.appendChild(el('circle', { cx: Math.cos(a) * 11, cy: Math.sin(a) * 11, r: 2, class: 'dot' }));
    }
    const centreRing = el('g', { class: 'ring' });
    centreRing.appendChild(centre);
    svg.appendChild(centreRing);

    const rings = CHAPTERS.map((chapter, i) => {
        const rIn = core + band * i;
        const rOut = rIn + band;
        const petals = chapter.results * 4;
        const offset = i % 2 ? Math.PI / petals : 0;
        const g = el('g', { class: 'ring', 'data-index': i });

        // Invisible annulus so the whole band responds to the pointer
        g.appendChild(el('path', { class: 'hit', d: annulus(rIn, rOut) }));

        for (let p = 0; p < petals; p++) {
            const theta = offset + (p / petals) * Math.PI * 2;
            const halfWidth = (Math.PI / petals) * 0.92;
            const path = el('path', {
                class: 'petal draw',
                d: petalPath(chapter.style, rIn + 3, rOut - 3, theta, halfWidth),
                pathLength: 1
            });
            path.style.animationDelay = (0.25 + i * 0.28 + p * 0.012) + 's';
            g.appendChild(path);

            if (chapter.style !== 'tear') {
                const between = theta + Math.PI / petals;
                g.appendChild(el('circle', {
                    class: 'dot',
                    cx: Math.cos(between) * (rOut - 4),
                    cy: Math.sin(between) * (rOut - 4),
                    r: 1.6
                }));
            }
        }

        const boundary = el('circle', { r: rOut, class: 'draw', pathLength: 1 });
        boundary.style.animationDelay = (0.1 + i * 0.28) + 's';
        g.appendChild(boundary);
        svg.appendChild(g);

        // Legend entry, which doubles as the keyboard control
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = `<span class="yr">${chapter.years}</span><span>${chapter.title}</span><span class="n">${chapter.results} result${chapter.results > 1 ? 's' : ''}</span>`;
        li.appendChild(button);
        list.appendChild(li);

        return { g, button };
    });

    let pinned = null;
    const setActive = (index) => {
        svg.classList.toggle('has-active', index !== null);
        rings.forEach((ring, i) => {
            const on = i === index;
            ring.g.classList.toggle('active', on);
            ring.button.classList.toggle('active', on);
            ring.button.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    };

    rings.forEach((ring, i) => {
        const enter = () => setActive(i);
        const leave = () => setActive(pinned);
        const toggle = () => { pinned = pinned === i ? null : i; setActive(pinned); };

        ring.g.addEventListener('mouseenter', enter);
        ring.g.addEventListener('mouseleave', leave);
        ring.g.addEventListener('click', toggle);
        ring.button.addEventListener('mouseenter', enter);
        ring.button.addEventListener('mouseleave', leave);
        ring.button.addEventListener('focus', enter);
        ring.button.addEventListener('blur', leave);
        ring.button.addEventListener('click', toggle);
    });
}

function petalPath(style, rIn, rOut, theta, w) {
    const P = (r, a) => `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
    const rMid = (rIn + rOut) / 2;

    if (style === 'arch') {
        // Rounded arch rising from the inner circle
        return `M ${P(rIn, theta - w)} C ${P(rOut + 4, theta - w)} ${P(rOut + 4, theta + w)} ${P(rIn, theta + w)}`;
    }
    if (style === 'tear') {
        // Teardrop: fat near the centre, pointed outward
        return `M ${P(rIn, theta)} C ${P(rIn + 4, theta - w * 1.6)} ${P(rMid + 6, theta - w * 1.2)} ${P(rOut, theta)} ` +
               `C ${P(rMid + 6, theta + w * 1.2)} ${P(rIn + 4, theta + w * 1.6)} ${P(rIn, theta)} Z`;
    }
    // Leaf: pointed at both ends
    return `M ${P(rIn, theta)} Q ${P(rMid, theta - w * 1.5)} ${P(rOut, theta)} Q ${P(rMid, theta + w * 1.5)} ${P(rIn, theta)} Z`;
}

function annulus(rIn, rOut) {
    return `M ${rOut} 0 A ${rOut} ${rOut} 0 1 0 ${-rOut} 0 A ${rOut} ${rOut} 0 1 0 ${rOut} 0 Z ` +
           `M ${rIn} 0 A ${rIn} ${rIn} 0 1 1 ${-rIn} 0 A ${rIn} ${rIn} 0 1 1 ${rIn} 0 Z`;
}

function el(name, attrs) {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
}

// ---------- Masthead dateline ----------
function setDateline() {
    const dateline = document.getElementById('dateline');
    if (!dateline) return;
    const now = new Date();
    const volume = now.getFullYear() - 2019;
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dateline.textContent = `Vol. ${volume} · ${date}`;
}

// ---------- Resume: shows a download button once resume.pdf is added to the repo ----------
async function addResumeLink() {
    const actions = document.getElementById('contactActions');
    if (!actions) return;

    try {
        const response = await fetch('resume.pdf', { method: 'HEAD' });
        if (!response.ok) return;
    } catch (err) {
        return;
    }

    const link = document.createElement('a');
    link.className = 'btn';
    link.href = 'resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Resume (PDF) ↗';
    actions.appendChild(link);
}
