/* ============================================================
   ONE-CLICK STORE — STOREFRONT LOGIC
   Cart + Wishlist persist via localStorage.
   ============================================================ */

const CART_KEY = 'ocs_cart';
const WISHLIST_KEY = 'ocs_wishlist';

/* ---------- CART HELPERS ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, qty = 1, option = null) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.option === option);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, qty, option });
  saveCart(cart);
  showToast('✅ Product added to cart');
}
function removeFromCart(productId, option = null) {
  let cart = getCart().filter(i => !(i.id === productId && i.option === option));
  saveCart(cart);
}
function updateCartQty(productId, qty, option = null) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.option === option);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}
function cartTotalCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartCount() {
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = cartTotalCount());
}

/* ---------- WISHLIST HELPERS ---------- */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch (e) { return []; }
}
function toggleWishlist(productId, btn) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
    if (btn) btn.classList.remove('active');
  } else {
    list.push(productId);
    if (btn) btn.classList.add('active');
    showToast('❤️ Added to wishlist');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

/* ---------- TOAST ---------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- STAR RATING RENDER ---------- */
function starString(rating) {
  const full = Math.round(rating);
  return '★★★★★☆☆☆☆☆'.slice(5 - full, 10 - full);
}

/* ---------- PRODUCT CARD TEMPLATE ---------- */
function productCardHTML(p) {
  const discount = p.originalPrice ? Math.round(100 - (p.price / p.originalPrice) * 100) : 0;
  const wished = getWishlist().includes(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-image-wrapper">
      <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
      ${discount > 0 ? `<div class="deal-badge">-${discount}%</div>` : ''}
      <div class="product-overlay">
        <button class="quick-view-btn" onclick="openQuickView('${p.id}')">Quick View</button>
        <button class="wishlist-btn ${wished ? 'active' : ''}" onclick="toggleWishlist('${p.id}', this)" aria-label="Wishlist">❤</button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="rating">
        <span class="stars">${starString(p.rating)}</span>
        <span class="review-count">(${p.reviews.toLocaleString()})</span>
      </div>
      <div class="product-pricing">
        <span class="price">$${p.price.toFixed(2)}</span>
        ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
      </div>
      <button class="add-to-cart-btn" ${p.stock === 0 ? 'disabled' : ''} onclick="addToCart('${p.id}', 1)">
        ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  </div>`;
}

function dealCardHTML(p) {
  const discount = p.originalPrice ? Math.round(100 - (p.price / p.originalPrice) * 100) : 0;
  return `
  <div class="deal-card" data-id="${p.id}">
    <div class="deal-badge">-${discount}%</div>
    <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy"></a>
    <div class="deal-info">
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="rating"><span class="stars">${starString(p.rating)}</span><span class="review-count">(${p.reviews.toLocaleString()})</span></div>
      <div class="pricing"><span class="price">$${p.price.toFixed(2)}</span><span class="original-price">$${p.originalPrice.toFixed(2)}</span></div>
      <div class="deal-timer"><span class="timer-label">Ends in:</span><span class="timer">11:45:30</span></div>
      <button class="add-to-cart-btn" onclick="addToCart('${p.id}', 1)">Add to Cart</button>
    </div>
  </div>`;
}

function bestsellerCardHTML(p, rank) {
  return `
  <div class="bestseller-card" data-id="${p.id}">
    <div class="bestseller-rank">#${rank}</div>
    <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy"></a>
    <div class="bestseller-info">
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="rating"><span class="stars">${starString(p.rating)}</span><span class="review-count">(${p.reviews.toLocaleString()})</span></div>
      <p class="description">${p.description.slice(0, 60)}...</p>
      <div class="pricing"><span class="price">$${p.price.toFixed(2)}</span><span class="original-price">$${p.originalPrice.toFixed(2)}</span></div>
      <button class="add-to-cart-btn" onclick="addToCart('${p.id}', 1)">Add to Cart</button>
    </div>
  </div>`;
}

/* ---------- QUICK VIEW MODAL ---------- */
function openQuickView(id) {
  const p = getProductById(id);
  if (!p) return;
  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalPrice').textContent = `$${p.price.toFixed(2)}`;
  document.getElementById('modalCartBtn').onclick = () => addToCart(p.id, 1);
  document.getElementById('quickViewModal').classList.add('open');
}
function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('open');
}

/* ---------- HERO SLIDER ---------- */
function initSlider() {
  const wrapper = document.querySelector('.slider-wrapper');
  if (!wrapper) return;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let idx = 0;
  function show(i) {
    idx = (i + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === idx));
  }
  document.getElementById('nextBtn')?.addEventListener('click', () => show(idx + 1));
  document.getElementById('prevBtn')?.addEventListener('click', () => show(idx - 1));
  dots.forEach((d, di) => d.addEventListener('click', () => show(di)));
  setInterval(() => show(idx + 1), 5500);
}

/* ---------- SEARCH ---------- */
function initSearch() {
  const form = document.getElementById('searchForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    window.location.href = `index.html?search=${encodeURIComponent(q)}#featured`;
  });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav-menu');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initSlider();
  initSearch();
  initMobileMenu();
  document.getElementById('closeModal')?.addEventListener('click', closeQuickView);
  document.getElementById('quickViewModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quickViewModal') closeQuickView();
  });
});
