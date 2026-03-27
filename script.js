(function () {
    'use strict';

    /* Scroll fade-in */
    const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        }),
        { threshold: 0.07, rootMargin: '0px 0px -28px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));

    /* Smooth scroll — offset by nav height */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
            ) || 64;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        });
    });

    /* AJAX Contact Form with Formspree */
    const contactForm = document.getElementById('contactForm');
    const formToast   = document.getElementById('formToast');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn  = contactForm.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending…';
            btn.disabled = true;

            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' },
                });
                if (res.ok) {
                    contactForm.reset();
                    toast('Assessment request received. We\'ll be in touch within 24h.', 'success');
                } else {
                    toast('Something went wrong. Email us directly: team@obsidianai.org', 'error');
                }
            } catch {
                toast('Network error. Email us at team@obsidianai.org', 'error');
            } finally {
                btn.textContent = orig;
                btn.disabled = false;
            }
        });
    }

    function toast(message, type) {
        if (!formToast) return;
        formToast.textContent = message;
        formToast.className = 'form-toast ' + type;
        setTimeout(() => { formToast.className = 'form-toast'; }, 7000);
    }

    /* Chat Widget */
    const BACKEND   = 'https://obsidianai-evtu.onrender.com';
    const fab       = document.getElementById('chatFab');
    const panel     = document.getElementById('chatPanel');
    const closeBtn  = document.getElementById('chatClose');
    const msgList   = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatIn');
    const chatSend  = document.getElementById('chatSend');

    if (!fab || !panel) return;

    const openPanel  = () => { panel.classList.add('open'); chatInput.focus(); };
    const closePanel = () => panel.classList.remove('open');

    fab.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);

    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') &&
            !panel.contains(e.target) && !fab.contains(e.target)) closePanel();
    });

    function appendMsg(text, isUser) {
        const d = document.createElement('div');
        d.className = 'msg ' + (isUser ? 'user' : 'bot');
        d.textContent = text;
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function showTyping() {
        const d = document.createElement('div');
        d.className = 'typing'; d.id = 'chatTyping';
        d.innerHTML = '<span></span><span></span><span></span>';
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function removeTyping() { document.getElementById('chatTyping')?.remove(); }

    async function sendMsg(text) {
        const msg = text.trim();
        if (!msg) return;
        appendMsg(msg, true);
        showTyping();
        chatInput.value = '';
        chatSend.disabled = true;

        try {
            const res = await fetch(`${BACKEND}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg }),
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            removeTyping();
            appendMsg(data.reply || 'Processing…', false);
        } catch {
            removeTyping();
            appendMsg('Backend is starting up — please try again in 30 seconds.', false);
        } finally {
            chatSend.disabled = false;
        }
    }

    chatSend.addEventListener('click', () => sendMsg(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) sendMsg(chatInput.value);
    });

    window.quickSend = (q) => { openPanel(); sendMsg(q); };

})();
