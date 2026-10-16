// Página de proceso: stepper de las siete fases y buscador de tecnologías.
// Sin JS la página muestra todas las fases apiladas y todas las tecnologías.
document.addEventListener('DOMContentLoaded', function() {

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Stepper de fases ────────────────────────────────────────
    (function initPhases() {
        const root = document.querySelector('[data-phases]');
        if (!root) return;

        const rail = root.querySelector('.phases-rail');
        const tabs = Array.from(root.querySelectorAll('.phase-tab'));
        const panels = Array.from(root.querySelectorAll('.phase-panel'));
        const stage = root.querySelector('.phases-stage');
        const bar = root.querySelector('.phases-progress-fill');
        const prev = root.querySelector('.phases-btn[data-dir="-1"]');
        const next = root.querySelector('.phases-btn[data-dir="1"]');
        const last = panels.length - 1;
        let current = 0;
        let autoplay = !reduceMotion;

        rail.setAttribute('role', 'tablist');
        rail.setAttribute('aria-label', 'Fases del proyecto');
        tabs.forEach((tab, i) => {
            tab.setAttribute('role', 'tab');
            panels[i].setAttribute('role', 'tabpanel');
            panels[i].setAttribute('aria-labelledby', tab.id);
            panels[i].setAttribute('tabindex', '0');
        });

        function restartBar() {
            if (!autoplay) return;
            root.classList.remove('is-autoplay');
            void bar.offsetWidth; // reinicia la animación de la barra
            root.classList.add('is-autoplay');
        }

        function show(index, dir) {
            index = Math.max(0, Math.min(last, index));
            root.dataset.dir = dir || (index < current ? -1 : 1);
            current = index;

            tabs.forEach((tab, i) => {
                const active = i === index;
                tab.classList.toggle('is-active', active);
                tab.classList.toggle('is-done', i < index);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
                tab.tabIndex = active ? 0 : -1;
                panels[i].hidden = !active;
                panels[i].classList.toggle('is-active', active);
            });

            root.style.setProperty('--progress', last ? index / last : 0);
            prev.disabled = index === 0;
            next.disabled = index === last;

            // Centrar la pestaña activa en el raíl sin mover la página
            const tab = tabs[index];
            rail.scrollTo({ left: tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2 });

            restartBar();
        }

        function stopAutoplay() {
            if (!autoplay) return;
            autoplay = false;
            root.classList.remove('is-autoplay', 'is-paused');
            root.classList.add('is-stopped');
        }

        function go(index, dir) {
            stopAutoplay();
            show(index, dir);
        }

        tabs.forEach((tab, i) => tab.addEventListener('click', () => go(i)));
        prev.addEventListener('click', () => go(current - 1, -1));
        next.addEventListener('click', () => go(current + 1, 1));

        rail.addEventListener('keydown', (e) => {
            const keys = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: last };
            if (!(e.key in keys)) return;
            e.preventDefault();
            go(keys[e.key]);
            tabs[current].focus();
        });

        // Swipe horizontal en móvil
        let startX = 0, startY = 0;
        stage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        stage.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
            }
        }, { passive: true });

        // Avance automático: solo con la sección a la vista y sin el ratón encima
        bar.addEventListener('animationend', () => {
            if (autoplay) show(current === last ? 0 : current + 1, 1);
        });

        let inView = false, hovering = false;
        function syncPause() {
            root.classList.toggle('is-paused', !inView || hovering);
        }
        stage.addEventListener('mouseenter', () => { hovering = true; syncPause(); });
        stage.addEventListener('mouseleave', () => { hovering = false; syncPause(); });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                inView = entries[0].isIntersecting;
                syncPause();
            }, { threshold: 0.35 }).observe(root);
        } else {
            inView = true;
        }

        if (!autoplay) root.classList.add('is-stopped');
        root.classList.add('is-ready');
        syncPause();
        show(0, 1);
    })();

    // ── Aparición escalonada de tarjetas y métricas ─────────────
    (function initStagger() {
        if (!('IntersectionObserver' in window) || reduceMotion) return;
        const groups = document.querySelectorAll('.page-proceso .solutions-grid, .page-proceso .tech-metrics');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                Array.from(entry.target.children).forEach(el => el.classList.add('reveal--visible'));
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1 });

        groups.forEach(group => {
            Array.from(group.children).forEach((el, i) => {
                el.classList.add('reveal');
                el.style.transitionDelay = (i % 6) * 0.08 + 's';
            });
            observer.observe(group);
        });
    })();

    // ── Buscador y filtros de tecnologías ───────────────────────
    (function initTechFilter() {
        const tools = document.querySelector('[data-tech-tools]');
        const grid = document.querySelector('.page-proceso .tech-grid');
        if (!tools || !grid) return;

        const input = tools.querySelector('input');
        const chipsBox = tools.querySelector('.tech-chips');
        const result = tools.querySelector('.tech-result');
        const cards = Array.from(grid.querySelectorAll('.tech-card'));
        const allTags = grid.querySelectorAll('.tag');
        let category = 'all';

        const normalize = str => str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9+#]/g, '');

        function makeChip(label, value) {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'tech-chip' + (value === 'all' ? ' is-active' : '');
            chip.textContent = label;
            chip.dataset.cat = value;
            chip.setAttribute('aria-pressed', value === 'all' ? 'true' : 'false');
            chipsBox.appendChild(chip);
        }

        makeChip('Todas', 'all');
        cards.forEach((card, i) => {
            card.dataset.cat = String(i);
            makeChip(card.querySelector('h3').textContent, String(i));
        });

        function defaultMessage() {
            return 'Más de ' + Math.floor(allTags.length / 10) * 10 + ' herramientas con las que trabajamos a diario.';
        }

        function update() {
            const q = normalize(input.value);
            let matches = [];

            grid.classList.toggle('is-searching', q.length > 0);

            cards.forEach(card => {
                const inCategory = category === 'all' || card.dataset.cat === category;
                let cardHasMatch = false;
                card.querySelectorAll('.tag').forEach(tag => {
                    const hit = q.length > 0 && normalize(tag.textContent).includes(q);
                    tag.classList.toggle('is-match', hit);
                    if (hit && inCategory) { cardHasMatch = true; matches.push(tag.textContent); }
                });
                const visible = inCategory && (q.length === 0 || cardHasMatch);
                const wasHidden = card.classList.contains('is-hidden');
                card.classList.toggle('is-hidden', !visible);
                if (visible && wasHidden && !reduceMotion) {
                    card.classList.remove('is-pop');
                    void card.offsetWidth;
                    card.classList.add('is-pop');
                }
            });

            if (!q) {
                result.textContent = defaultMessage();
            } else if (matches.length) {
                result.innerHTML = '';
                result.append('Sí, trabajamos con ');
                const strong = document.createElement('strong');
                strong.textContent = matches.slice(0, 3).join(', ') + (matches.length > 3 ? '…' : '');
                result.append(strong, '.');
            } else {
                result.innerHTML = '';
                result.append('No está en la lista, pero seguramente podamos usarla. ');
                const link = document.createElement('a');
                link.href = 'cotiza-tu-proyecto.html';
                link.textContent = 'Pregúntanos';
                result.append(link, '.');
            }
        }

        chipsBox.addEventListener('click', (e) => {
            const chip = e.target.closest('.tech-chip');
            if (!chip) return;
            category = chip.dataset.cat;
            chipsBox.querySelectorAll('.tech-chip').forEach(c => {
                const active = c === chip;
                c.classList.toggle('is-active', active);
                c.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            update();
        });

        input.addEventListener('input', update);

        tools.hidden = false;
        update();
    })();
});
