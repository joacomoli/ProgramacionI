// --------------------------------------------
// E-commerce Vanilla JS (Simple y sin extras)
// --------------------------------------------

// 1) Referencias al DOM
const catalogContainer = document.getElementById('catalogContainer');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartTableWrapper = document.getElementById('cartTableWrapper');
const cartTableBody = document.getElementById('cartTableBody');
const cartTotalAmount = document.getElementById('cartTotalAmount');

// 2) Estado del carrito
// Guardamos cantidades por id de producto
const cartQuantitiesByProductId = {};

// 3) Productos cargados (se llena con el JSON)
let loadedProducts = [];

// 4) Cargar catálogo desde JSON (Promesa)
function loadCatalogFromJSON() {
  return fetch('../data/products.json')
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo cargar /data/products.json');
      return response.json();
    });
}

// 5) Renderizar catálogo
function renderCatalog(products) {
  const html = products.map((product) => {
    return `
      <article class="card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <div class="row">
          <strong>$${product.price.toFixed(2)}</strong>
          <button class="addToCartButton">Agregar</button>
        </div>
      </article>
    `;
  }).join('');

  catalogContainer.innerHTML = html;
}

// 6) Obtener items detallados del carrito
function getDetailedCartItems() {
  return Object.entries(cartQuantitiesByProductId).map(([productId, quantity]) => {
    const product = loadedProducts.find(p => p.id === productId);
    const price = product ? product.price : 0;
    return {
      id: productId,
      title: product ? product.title : '(desconocido)',
      price,
      quantity,
      subtotal: price * quantity
    };
  });
}

// 7) Renderizar carrito
function renderCart() {
  const items = getDetailedCartItems();
  const hasItems = items.length > 0;

  emptyCartMessage.hidden = hasItems;
  cartTableWrapper.hidden = !hasItems;

  cartTableBody.innerHTML = items.map(item => `
    <tr data-product-id="${item.id}">
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input class="quantityInput" type="number" min="1" value="${item.quantity}">
      </td>
      <td>$${item.subtotal.toFixed(2)}</td>
      <td><button class="removeItemButton">✕</button></td>
    </tr>
  `).join('');

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);
  cartTotalAmount.textContent = `$${total.toFixed(2)}`;
}

// 8) Eventos
// Agregar al carrito
catalogContainer.addEventListener('click', (event) => {
  const addButton = event.target.closest('.addToCartButton');
  if (!addButton) return;

  const productCard = addButton.closest('[data-product-id]');
  const productId = productCard.dataset.productId;

  cartQuantitiesByProductId[productId] = (cartQuantitiesByProductId[productId] || 0) + 1;
  renderCart();
});

// Cambiar cantidad
cartTableBody.addEventListener('input', (event) => {
  const quantityInput = event.target.closest('.quantityInput');
  if (!quantityInput) return;

  const row = quantityInput.closest('tr[data-product-id]');
  const productId = row.dataset.productId;

  const newQuantity = Math.max(1, parseInt(quantityInput.value || '1', 10));
  cartQuantitiesByProductId[productId] = newQuantity;
  renderCart();
});

// Eliminar producto
cartTableBody.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.removeItemButton');
  if (!removeButton) return;

  const row = removeButton.closest('tr[data-product-id]');
  const productId = row.dataset.productId;

  delete cartQuantitiesByProductId[productId];
  renderCart();
});

// 9) Inicio
loadCatalogFromJSON()
  .then((products) => {
    loadedProducts = products;
    renderCatalog(products);
    renderCart();
  })
  .catch((error) => {
    catalogContainer.textContent = 'Error al cargar el catálogo: ' + error.message;
  });
