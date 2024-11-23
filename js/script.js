(function ($) {

  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  var initSwiper = function () {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var bestselling_swiper = new Swiper(".bestselling-swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
      }
    });

    var testimonial_swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },

      }
    });

  }

  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function () {

    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      spaceBetween: 8,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var large_slider = new Swiper(".product-large-slider", {
      spaceBetween: 10,
      slidesPerView: 1,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    window.addEventListener("load", (event) => {
      //isotope
      $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });


      var $grid = $('.entry-container').isotope({
        itemSelector: '.entry-item',
        layoutMode: 'masonry'
      });


      // Initialize Isotope
      var $container = $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });

      $(document).ready(function () {
        //active button
        $('.filter-button').click(function () {
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
        });
      });

      // Filter items on button click
      $('.filter-button').click(function () {
        var filterValue = $(this).attr('data-filter');
        if (filterValue === '*') {
          // Show all items
          $container.isotope({ filter: '*' });
        } else {
          // Show filtered items
          $container.isotope({ filter: filterValue });
        }
      });

    });

  }); // End of a document

})(jQuery);


(function () {
  "use strict";


  // Seleciona o botão de rolagem para o topo
  let scrollTop = document.querySelector('.scroll-top');

  // Função para mostrar ou esconder o botão de rolagem baseado na posição da página
  function toggleScrollTop() {
    if (scrollTop) {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active'); // Mostra o botão
      } else {
        scrollTop.classList.remove('active'); // Esconde o botão
      }
    }
  }

  // Função personalizada de rolagem suave para o topo
  function smoothScrollToTop() {
    const scrollDuration = 500;  // Duração total da rolagem em milissegundos
    const scrollStep = -window.scrollY / (scrollDuration / 17);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  // Evento de clique no botão que chama a função de rolagem suave
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollToTop();  // Usa a função personalizada para rolar até o topo
  });

  // Chama a função para verificar a visibilidade do botão ao carregar a página e ao rolar
  document.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('load', toggleScrollTop);
})();

/*CARRINHO DE COMPRAS*/

// Inicializa o carrinho
let cart = {
  items: {},
  totalPrice: 0,
  itemCount: 0,
};

// Função para adicionar item ao carrinho
function addToCart(productName, productPrice) {
  // Verifica se o item já está no carrinho
  if (cart.items[productName]) {
    // Se já existir, apenas aumenta a quantidade e o preço total
    cart.items[productName].quantity += 1;
    cart.items[productName].price += parseFloat(productPrice);
  } else {
    // Se não existir, adiciona o novo item
    cart.items[productName] = {
      quantity: 1,
      price: parseFloat(productPrice),
    };
  }
  cart.totalPrice += parseFloat(productPrice);
  cart.itemCount += 1;
  updateCart();
}

// Função para remover item do carrinho
function removeFromCart(productName) {
  if (cart.items[productName]) {
    cart.totalPrice -= cart.items[productName].price; // Subtrai o preço do item
    cart.itemCount -= cart.items[productName].quantity; // Diminui a contagem total de itens
    delete cart.items[productName]; // Remove o item do objeto
    updateCart();
  }
}

// Função para limpar o carrinho
function clearCart() {
  cart.items = {};
  cart.totalPrice = 0;
  cart.itemCount = 0;
  updateCart();
}

// Atualiza a exibição do carrinho
function updateCart() {
  const cartCount = document.querySelector('.badge.bg-primary');
  const cartTotal = document.querySelector('#cart-total');
  const cartItemsContainer = document.querySelector('#cart-items');
  const clearCartButton = document.getElementById('clear-cart'); // Botão de limpar carrinho

  // Atualiza a contagem de itens
  cartCount.textContent = cart.itemCount;

  // Atualiza o total
  cartTotal.textContent = `$${cart.totalPrice.toFixed(2)}`;

  // Limpa os itens do carrinho exibidos
  cartItemsContainer.innerHTML = '';

  // Adiciona os itens do carrinho à lista
  for (const productName in cart.items) {
    const item = cart.items[productName];
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
    listItem.innerHTML = `
        <div>
      <h6 class="my-0">${productName}</h6>
      <small class="text-body-secondary d-flex justify-content-center align-items-center">
        <button class="btn quantity-button" onclick="updateQuantity('${productName}', -1)">-</button>
        <span id="quantity-${productName}" class="mx-2">${item.quantity}</span>
        <button class="btn quantity-button" onclick="updateQuantity('${productName}', 1)">+</button>
      </small>
    </div>
    <span class="text-body-secondary">$${item.price.toFixed(2)}</span>
    <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart('${productName}')">X</button>
  `;
    cartItemsContainer.appendChild(listItem);
  }

  // Mostra ou esconde o botão de limpar carrinho baseado na contagem de itens
  clearCartButton.style.display = cart.itemCount > 0 ? 'block' : 'none';
}

// Nova função para atualizar a quantidade
function updateQuantity(productName, change) {
  if (cart.items[productName]) {
    const newQuantity = cart.items[productName].quantity + change;

    // Não permitir que a quantidade seja menor que 1
    if (newQuantity < 1) {
      removeFromCart(productName); // Remove o item se a quantidade chegar a 0
    } else {
      // Atualiza a quantidade e o preço total
      const productPrice = cart.items[productName].price / cart.items[productName].quantity; // Preço unitário
      cart.items[productName].quantity = newQuantity;
      cart.items[productName].price = productPrice * newQuantity; // Atualiza o preço total
      cart.totalPrice = Object.values(cart.items).reduce((sum, item) => sum + item.price, 0); // Recalcula o preço total
      cart.itemCount += change; // Atualiza a contagem total de itens
      updateCart(); // Atualiza a interface do carrinho
    }
  }
}

// Adiciona eventos aos botões de adicionar ao carrinho
document.querySelectorAll('.btn-add').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');
    addToCart(productName, productPrice); // Chama a função para adicionar ao carrinho
  });
});

// Evento para limpar o carrinho
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Certifique-se de que o carrinho comece vazio ao carregar a página
window.onload = () => {
  updateCart(); // Atualiza o carrinho para garantir que comece vazio
};

/*CORRIGIR ERRO REINICIANDO PAGINA AO SAIR DO CARRINHO*/

document.querySelectorAll('.offcanvas .btn-close').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault(); // Previne a ação padrão do botão
    // Aqui você pode adicionar qualquer lógica adicional, se necessário
    const offcanvasElement = button.closest('.offcanvas');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement); // Obter a instância do offcanvas
    if (offcanvas) {
      offcanvas.hide(); // Fechar o offcanvas
    }
  });
});

// Obtém todos os botões que têm a classe 'btn-add'
const buttons = document.querySelectorAll('.btn-add');

// Adiciona um evento de clique a cada botão
buttons.forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link

    // Adiciona a classe 'clicked' para mudar a cor e reduzir o tamanho do botão
    button.classList.add('clicked');

    // Remove a classe 'clicked' após 150ms para voltar à cor original e ao tamanho normal
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 150); // Duração da mudança de cor e tamanho (150ms)
  });
});

// Função para atualizar o número do badge do ícone do carrinho
function updateCartBadge() {
  const cartBadge = document.querySelector('.badge.bg-primary');

  // Mostra o número de itens no badge e oculta se estiver vazio
  if (cart.itemCount > 0) {
    cartBadge.textContent = cart.itemCount;
    cartBadge.style.display = 'inline-block';
  } else {
    cartBadge.style.display = 'none';
  }
}

function updateCart() {
  const cartCountSidebar = document.querySelector('#cart-item-count'); // Contador na sidebar do carrinho
  const cartCountIcon = document.querySelector('#cart-icon-count'); // Contador no ícone do carrinho
  const cartItemsContainer = document.querySelector('#cart-items');
  const clearCartButton = document.querySelector('#clear-cart'); // Botão "Clear Cart"

  // Atualiza o número de itens nos badges (tanto o da sidebar quanto o do ícone) e exibe ou oculta os badges e o botão Clear Cart
  if (cart.itemCount > 0) {
    cartCountSidebar.textContent = cart.itemCount;
    cartCountIcon.textContent = cart.itemCount;
    cartCountSidebar.style.display = 'inline-block';
    cartCountIcon.style.display = 'inline-block';
    clearCartButton.style.display = 'inline-block';
  } else {
    cartCountSidebar.style.display = 'none';
    cartCountIcon.style.display = 'none';
    clearCartButton.style.display = 'none';
  }

  // Limpa os itens do carrinho exibidos
  cartItemsContainer.innerHTML = '';

  // Adiciona os itens do carrinho à lista
  for (const productName in cart.items) {
    const item = cart.items[productName];
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
    listItem.innerHTML = `
    <div>
      <h6 class="my-0">${productName}</h6>
      <small class="text-body-secondary d-flex justify-content-center align-items-center">
        <button class="btn quantity-button" onclick="updateQuantity('${productName}', -1)">-</button>
        <span id="quantity-${productName}" class="mx-2">${item.quantity}</span>
        <button class="btn quantity-button" onclick="updateQuantity('${productName}', 1)">+</button>
      </small>
    </div>
    <span class="text-body-secondary">$${item.price.toFixed(2)}</span>
    <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart('${productName}')">X</button>
  `;
    cartItemsContainer.appendChild(listItem);
  }

  // Atualiza o total do carrinho
  const cartTotal = document.querySelector('#cart-total');
  cartTotal.textContent = `$${cart.totalPrice.toFixed(2)}`;
}

//BUG DO CARRINHO

const menu = document.querySelector('.your-floating-menu');
window.addEventListener('scroll', () => {
  if (menu.classList.contains('visible')) {
    document.querySelector('.your-card-class').classList.add('force-update');
    setTimeout(() => {
      document.querySelector('.your-card-class').classList.remove('force-update');
    }, 100);
  }
});

//MECANISMO DE BUSCA

function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const resultsDiv = document.getElementById('search-results');
  const productList = Array.from(document.querySelectorAll('#clothing .swiper-slide'));

  // Esconde a div se não houver busca
  if (query === "") {
    resultsDiv.style.display = "none";
    resultsDiv.innerHTML = "";
    return;
  }

  // Filtra produtos dentro de #clothing com a classe swiper-slide
  const filteredProducts = productList.filter(item =>
    item.getAttribute('data-name').toLowerCase().includes(query)
  );

  // Exibe os itens encontrados ou uma mensagem de "não encontrado"
  if (filteredProducts.length > 0) {
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = filteredProducts.map(item => `
      <div class="search-item border-bottom py-2">
        <a href="${item.querySelector('a').href}" class="text-decoration-none">${item.textContent.trim()}</a>
      </div>
    `).join('');
  } else {
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = '<p>Nenhum produto encontrado</p>';
  }
}

// Oculta a div de resultados ao clicar fora dela
document.addEventListener('click', function (event) {
  const isClickInside = document.getElementById('search-form').contains(event.target);
  if (!isClickInside) {
    document.getElementById('search-results').style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const select = document.getElementById("select-id");

  form.addEventListener("submit", function (event) {
    // Verifica se a primeira opção do select está selecionada
    if (select.selectedIndex === 0) {
      event.preventDefault(); // Impede o envio do formulário
      alert("Por favor, avalie o site antes de enviar o formulário.");
      return;
    }

    // Exibe o alerta de sucesso
    alert("Formulário enviado com sucesso!");

    // Redireciona para o início da página
    window.location.href = "#";

    // Opcional: Reseta o formulário após o envio
    form.reset();
  });
});



