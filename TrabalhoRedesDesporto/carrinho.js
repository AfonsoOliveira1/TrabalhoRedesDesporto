function addCarrinho(nome, preco){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ nome, preco });
  localStorage.setItem('cart', JSON.stringify(cart));

  let qtd = parseInt(localStorage.getItem('qtd')) || 0; //se for null mete a 0
  let prec = parseInt(localStorage.getItem('prec')) || 0;

  qtd++;
  prec += preco;

  localStorage.setItem('qtd', qtd);
  localStorage.setItem('prec', prec.toFixed(2));
  atualizaCarrinho(qtd);
}

function atualizaCarrinho(qtd){
  const contador = document.getElementById('quantidade');
  if (contador) {
    contador.textContent = qtd;
  }
}

//quando se muda de pagina isto atualiza logo.
window.onload = function () {
  const qtd = parseInt(localStorage.getItem('qtd')) || 0;
  atualizaCarrinho(qtd);

  const totalSpan = document.getElementById('total-pagar');
  //se tiver o elemento total-pagar
  if (totalSpan) {
    const prec = parseFloat(localStorage.getItem('prec')) || 0;
    totalSpan.textContent = prec.toFixed(2);
  }

  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  if (cartItemsDiv && cartTotalSpan) {
    mostrarCarrinho();
  }

  const btnPagar = document.getElementById('btn-pagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', function () {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de pagar.');
        return;
      }
      window.location.href = 'pagar.html';
    });
  }

};

function removerCarrinho(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = cart[index];
  let qtd = parseInt(localStorage.getItem('qtd')) || 0;
  let prec = parseFloat(localStorage.getItem('prec')) || 0;

  qtd--;
  prec -= item.preco;

  cart.splice(index, 1); //remove

  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('qtd', Math.max(0, qtd));
  localStorage.setItem('prec', Math.max(0, prec).toFixed(2));

  atualizaCarrinho(qtd);
  mostrarCarrinho();
}

function mostrarCarrinho() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const qtd = cart.length;

  if (qtd === 0 || cart.length === 0) {
    cartItemsDiv.innerHTML = '<h3><strong>Carrinho Vazio!</strong></h3>';
    cartTotalSpan.textContent = '0.00';
    return;
  }

  cartItemsDiv.innerHTML = ''; //limpa
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <h3>${item.nome} - €${item.preco.toFixed(2)}</h3>
      <button class="btn-comprar" onclick="removerCarrinho(${index})">Remover</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.preco;
  });

  cartTotalSpan.textContent = total.toFixed(2);
}