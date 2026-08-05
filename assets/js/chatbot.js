/* ============================================================
   ONE-CLICK STORE — SUPPORT CHATBOT WIDGET
   Rule-based assistant: FAQs, order help, and live product search
   from the shared catalog (products.js must load before this file).
   ============================================================ */

(function () {
  const CHAT_KEY = 'ocs_chat_history';

  const QUICK_REPLIES = [
    { label: '📦 Track my order', value: 'track my order' },
    { label: '🚚 Shipping info', value: 'shipping' },
    { label: '↩️ Return policy', value: 'returns' },
    { label: '🔍 Find a product', value: 'find a product' }
  ];

  /* ---------- INJECT WIDGET MARKUP ---------- */
  function injectWidget() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <button id="chatFab" class="chat-fab" aria-label="Open support chat">
        💬<span class="chat-fab-dot"></span>
      </button>
      <div id="chatWindow" class="chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-avatar">🛍️</span>
            <div>
              <strong>One-Click Assistant</strong>
              <span class="chat-status"><span class="chat-status-dot"></span> Online now</span>
            </div>
          </div>
          <button id="chatClose" class="chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div id="chatBody" class="chat-body"></div>
        <div id="chatQuickReplies" class="chat-quick-replies"></div>
        <form id="chatForm" class="chat-input-row">
          <input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off" aria-label="Chat message">
          <button type="submit" class="chat-send" aria-label="Send">➤</button>
        </form>
      </div>`;
    document.body.appendChild(wrap);
  }

  /* ---------- MESSAGE RENDERING ---------- */
  function addMessage(text, from, opts = {}) {
    const body = document.getElementById('chatBody');
    const el = document.createElement('div');
    el.className = `chat-msg ${from}`;
    el.innerHTML = opts.html ? text : escapeHTML(text);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function addProductCards(products) {
    const body = document.getElementById('chatBody');
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = products.map(p => `
      <a href="product.html?id=${p.id}" class="chat-product-card">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div class="chat-product-name">${p.name}</div>
          <div class="chat-product-price">$${p.price.toFixed(2)}</div>
        </div>
      </a>`).join('');
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping() {
    const body = document.getElementById('chatBody');
    const el = document.createElement('div');
    el.className = 'chat-msg bot chat-typing';
    el.id = 'chatTypingIndicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping() {
    document.getElementById('chatTypingIndicator')?.remove();
  }

  function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function renderQuickReplies(list) {
    const box = document.getElementById('chatQuickReplies');
    if (!list || list.length === 0) { box.innerHTML = ''; return; }
    box.innerHTML = list.map(q => `<button type="button" class="chat-chip" data-value="${escapeHTML(q.value)}">${q.label}</button>`).join('');
    box.querySelectorAll('.chat-chip').forEach(btn => {
      btn.addEventListener('click', () => handleUserMessage(btn.dataset.value, btn.textContent.trim()));
    });
  }

  /* ---------- BOT BRAIN (rule-based intent matching) ---------- */
  function botReply(message) {
    const m = message.toLowerCase();

    if (/\b(hi|hello|hey|salam|assalam)\b/.test(m)) {
      return { text: "Hey there! 👋 I'm the One-Click Store assistant. I can help you track orders, check shipping & returns, or find products. What do you need?", quick: QUICK_REPLIES };
    }
    if (/track|where.*order|order status/.test(m)) {
      return { text: "You can track your order anytime from <strong>Returns & Orders</strong> in the header, or head to your <a href='cart.html'>Cart</a> to review recent purchases. For a specific order, share your order ID (e.g. #OCS-10234) and our support team will follow up by email.", html: true };
    }
    if (/ship|delivery|deliver/.test(m)) {
      return { text: "🚚 We offer <strong>free shipping on all orders over $50</strong>. Standard delivery takes 3–5 business days, and express delivery (1–2 days) is available at checkout for an extra fee.", html: true };
    }
    if (/return|refund|exchange/.test(m)) {
      return { text: "↩️ We have a <strong>30-day hassle-free return policy</strong>. Items must be unused and in original packaging. Refunds are processed within 5–7 business days once we receive the item.", html: true };
    }
    if (/payment|pay|card|paypal/.test(m)) {
      return { text: "💳 We accept Visa, Mastercard, and PayPal. All payments are encrypted and processed through a secure, PCI-compliant checkout." };
    }
    if (/discount|coupon|promo|code/.test(m)) {
      return { text: "🎉 Try the code <strong>SAVE10</strong> at checkout for 10% off your order! Subscribe to our newsletter on the homepage for more exclusive deals.", html: true };
    }
    if (/human|agent|support|talk to (a |someone)/.test(m)) {
      return { text: "I'll connect you with a human agent. In the meantime, you can reach our support team anytime at <strong>support@oneclickstore.com</strong> — average response time is under 2 hours.", html: true };
    }
    if (/thank/.test(m)) {
      return { text: "You're very welcome! 😊 Anything else I can help with?", quick: QUICK_REPLIES };
    }
    if (/find a product|search|looking for|need a|show me/.test(m)) {
      return { text: "Sure! Tell me what you're looking for — e.g. 'headphones', 'backpack', or 'camera' — and I'll pull up matching products." };
    }

    // Fallback: try matching against the product catalog
    if (typeof getProducts === 'function') {
      const products = getProducts();
      const matches = products.filter(p =>
        p.name.toLowerCase().includes(m) ||
        p.category.toLowerCase().includes(m) ||
        m.split(' ').some(word => word.length > 2 && p.name.toLowerCase().includes(word))
      ).slice(0, 3);
      if (matches.length > 0) {
        return { text: `I found ${matches.length} product${matches.length > 1 ? 's' : ''} that might match:`, products: matches };
      }
    }

    return { text: "I'm not totally sure about that one — could you rephrase, or pick an option below? You can also email support@oneclickstore.com for detailed help.", quick: QUICK_REPLIES };
  }

  /* ---------- HANDLE SEND ---------- */
  function handleUserMessage(rawText, displayText) {
    const text = (rawText || '').trim();
    if (!text) return;
    addMessage(displayText || text, 'user');
    renderQuickReplies([]);
    showTyping();

    setTimeout(() => {
      hideTyping();
      const reply = botReply(text);
      addMessage(reply.text, 'bot', { html: !!reply.html });
      if (reply.products) addProductCards(reply.products);
      renderQuickReplies(reply.quick || []);
    }, 550 + Math.random() * 400);
  }

  /* ---------- INIT ---------- */
  function initChatbot() {
    injectWidget();
    const fab = document.getElementById('chatFab');
    const win = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatClose');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');

    fab.addEventListener('click', () => {
      win.classList.toggle('open');
      fab.classList.toggle('open');
      if (win.classList.contains('open')) input.focus();
    });
    closeBtn.addEventListener('click', () => {
      win.classList.remove('open');
      fab.classList.remove('open');
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value;
      input.value = '';
      handleUserMessage(val);
    });

    // Greeting
    addMessage("Hi! 👋 I'm your One-Click Store assistant. Ask me about orders, shipping, returns — or search for a product.", 'bot');
    renderQuickReplies(QUICK_REPLIES);
  }

  document.addEventListener('DOMContentLoaded', initChatbot);
})();
