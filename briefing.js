// briefing.js - Wizard del formulario de descubrimiento de proyecto (Elefante Lab)

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('briefingForm');
    if (!form) return;

    const steps = Array.from(form.querySelectorAll('.briefing-step'));
    const prevBtn = form.querySelector('.briefing-prev');
    const nextBtn = form.querySelector('.briefing-next');
    const submitBtn = form.querySelector('.briefing-submit');
    const stepCurrentEl = document.getElementById('stepCurrent');
    const stepTotalEl = document.getElementById('stepTotal');
    const stepTitleEl = document.getElementById('stepTitle');
    const progressFill = document.getElementById('progressFill');
    const errorBanner = document.getElementById('briefingErrorBanner');
    const successBox = document.getElementById('briefingSuccess');

    const STEP_TITLES = {
        1: 'Datos de contacto',
        2: 'Tipo de proyecto',
        3: 'Negocio y objetivos',
        4: 'Público y experiencia',
        5: 'Diseño, marca y contenido',
        6: 'Página web',
        7: 'Tienda online',
        8: 'Aplicación móvil',
        9: 'Integraciones, datos y seguridad',
        10: 'Plazos, presupuesto y colaboración',
        11: 'Resumen final',
    };

    const CONDITIONS = {
        web: ['Página web corporativa', 'Landing page', 'Rediseño o mejora', 'Mantenimiento'],
        tienda: ['Tienda online'],
        app: ['Aplicación móvil', 'Plataforma / app web'],
    };

    let currentIndex = 0;

    // Fechas por defecto = hoy
    const todayISO = new Date().toISOString().slice(0, 10);
    const fechaCump = document.getElementById('fecha_cumplimentacion');
    const fechaConf = document.getElementById('fecha_confirmacion');
    if (fechaCump && !fechaCump.value) fechaCump.value = todayISO;
    if (fechaConf && !fechaConf.value) fechaConf.value = todayISO;

    function computeVisibleSteps() {
        const checked = Array.from(form.querySelectorAll('input[name="tipo_proyecto"]:checked')).map(i => i.value);
        return steps.filter(step => {
            const cond = step.dataset.conditional;
            if (!cond) return true;
            const triggers = CONDITIONS[cond] || [];
            return triggers.some(v => checked.includes(v));
        });
    }

    function render() {
        const visible = computeVisibleSteps();
        if (currentIndex > visible.length - 1) currentIndex = visible.length - 1;
        if (currentIndex < 0) currentIndex = 0;

        steps.forEach(step => { step.style.display = 'none'; });
        visible.forEach((step, i) => {
            if (i === currentIndex) step.style.display = '';
        });

        const activeStep = visible[currentIndex];
        if (!activeStep) return;

        const stepNum = activeStep.dataset.stepIndex;
        stepCurrentEl.textContent = currentIndex + 1;
        stepTotalEl.textContent = visible.length;
        stepTitleEl.textContent = STEP_TITLES[stepNum] || '';
        progressFill.style.width = Math.round(((currentIndex + 1) / visible.length) * 100) + '%';

        const isLast = currentIndex === visible.length - 1;
        prevBtn.hidden = currentIndex === 0;
        nextBtn.hidden = isLast;
        submitBtn.hidden = !isLast;
    }

    function validateActiveStep(step) {
        const fields = step.querySelectorAll('input, textarea, select');
        for (const field of fields) {
            if (typeof field.checkValidity === 'function' && !field.checkValidity()) {
                field.reportValidity();
                return false;
            }
        }

        const requireOneGroups = step.querySelectorAll('[data-require-one]');
        for (const group of requireOneGroups) {
            const name = group.dataset.requireOne;
            const checked = group.querySelectorAll('input[name="' + name + '"]:checked');
            const errorEl = group.parentElement.querySelector('.briefing-group-error');
            if (checked.length === 0) {
                if (errorEl) errorEl.classList.add('is-visible');
                return false;
            }
            if (errorEl) errorEl.classList.remove('is-visible');
        }
        return true;
    }

    function collectFormData(formEl) {
        const data = {};
        const seen = new Set();
        const elements = Array.from(formEl.elements).filter(el => el.name);

        elements.forEach(el => {
            if (seen.has(el.name)) return;
            seen.add(el.name);

            if (el.type === 'checkbox') {
                const group = elements.filter(e => e.name === el.name && e.type === 'checkbox');
                if (group.length > 1) {
                    data[el.name] = group.filter(e => e.checked).map(e => e.value).join(', ');
                } else {
                    data[el.name] = el.checked ? 'Sí' : 'No';
                }
            } else if (el.type === 'radio') {
                const group = elements.filter(e => e.name === el.name && e.type === 'radio');
                const checkedOne = group.find(e => e.checked);
                data[el.name] = checkedOne ? checkedOne.value : '';
            } else {
                data[el.name] = el.value;
            }
        });

        return data;
    }

    form.querySelectorAll('input[name="tipo_proyecto"]').forEach(cb => {
        cb.addEventListener('change', render);
    });

    nextBtn.addEventListener('click', () => {
        const visible = computeVisibleSteps();
        const activeStep = visible[currentIndex];
        if (!validateActiveStep(activeStep)) return;
        currentIndex++;
        render();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        render();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const visible = computeVisibleSteps();
        const lastStep = visible[visible.length - 1];
        if (!validateActiveStep(lastStep)) return;

        errorBanner.hidden = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        const payload = collectFormData(form);

        fetch('/api/briefing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(response => response.json().catch(() => ({})).then(data => ({ response, data })))
            .then(({ response, data }) => {
                if (response.ok && data.success) {
                    form.hidden = true;
                    successBox.hidden = false;
                    successBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    errorBanner.textContent = data.message || 'No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos por WhatsApp.';
                    errorBanner.hidden = false;
                    errorBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar formulario';
                }
            })
            .catch(() => {
                errorBanner.textContent = 'Error de conexión. Comprueba tu internet e inténtalo de nuevo.';
                errorBanner.hidden = false;
                errorBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar formulario';
            });
    });

    render();
});
