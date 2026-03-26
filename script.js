/* ═══════════════════════════════════════════════════════
   ObsidianAI — script.js
═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Scroll fade-in ──────────────────────────────── */
    const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target); // fire once
            }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));

    /* ── Smooth scroll ───────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-h'), 10) || 64;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ── AJAX Contact Form ───────────────────────────── */
    const contactForm = document.getElementById('contactForm');
    const formToast   = document.getElementById('formToast');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending…';
            submitBtn.disabled = true;

            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' },
                });

                if (res.ok) {
                    contactForm.reset();
                    showToast('Message received. We\'ll be in touch within 24h.', 'success');
                } else {
                    showToast('Something went wrong. Email us at team@obsidianai.org', 'error');
                }
            } catch {
                showToast('Network error. Email us at team@obsidianai.org', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showToast(message, type) {
        if (!formToast) return;
        formToast.textContent = message;
        formToast.className = `form-toast ${type} visible`;
        setTimeout(() => formToast.classList.remove('visible'), 6000);
    }

    /* ── Chat Widget ─────────────────────────────────── */
    const BACKEND    = 'https://obsidianai-evtu.onrender.com';
    const fab        = document.getElementById('chatFab');
    const panel      = document.getElementById('chatPanel');
    const closeBtn   = document.getElementById('chatClose');
    const msgList    = document.getElementById('chatMessages');
    const chatInput  = document.getElementById('chatIn');
    const chatSend   = document.getElementById('chatSend');

    if (!fab || !panel) return; // guard if elements missing

    const openPanel  = () => { panel.classList.add('open'); chatInput.focus(); };
    const closePanel = () => panel.classList.remove('open');

    fab.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') &&
            !panel.contains(e.target) &&
            !fab.contains(e.target)) {
            closePanel();
        }
    });

    function appendMsg(text, isUser) {
        const d = document.createElement('div');
        d.className = 'msg ' + (isUser ? 'user' : 'bot');
        d.textContent = text;
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
        return d;
    }

    function showTyping() {
        const d = document.createElement('div');
        d.className = 'typing';
        d.id = 'chatTyping';
        d.innerHTML = '<span></span><span></span><span></span>';
        msgList.appendChild(d);
        msgList.scrollTop = msgList.scrollHeight;
    }

    function removeTyping() {
        document.getElementById('chatTyping')?.remove();
    }

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
            appendMsg(
                'Backend is starting up (free tier) — please try again in 30 seconds.',
                false
            );
        } finally {
            chatSend.disabled = false;
        }
    }

    chatSend.addEventListener('click', () => sendMsg(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) sendMsg(chatInput.value);
    });

    // Expose for inline onclick shortcuts
    window.quickSend = (q) => { openPanel(); sendMsg(q); };

})();
