let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

const produtos = [
  { nome: "Hambúrguer", preco: 25 },
  { nome: "Pizza", preco: 40 },
  { nome: "Yakisoba", preco: 30 }
];

// RENDER
function render() {
  let html = "";
  let total = 0;

  produtos.forEach((p, i) => {
    html += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button onclick="add(${i})">Adicionar</button>
      </div>
    `;
  });

  document.getElementById("produtos").innerHTML = html;
}

function add(i) {
  carrinho.push(produtos[i]);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let html = "";
  let total = 0;

  carrinho.forEach(c => {
    html += `<p>${c.nome} - R$ ${c.preco}</p>`;
    total += c.preco;
  });

  document.getElementById("itens").innerHTML = html;
  document.getElementById("total").innerText = "Total: R$ " + total;
}

// PAGAMENTO
function irPagamento() {
  document.getElementById("pagamento").style.display = "block";
}

// PIX
function copiarPix() {
  navigator.clipboard.writeText("komfome@gmail.com");
  alert("PIX copiado!");
}

// FINALIZAR
function enviarPedido() {

  let codigo = Math.floor(1000 + Math.random() * 9000);

  let pedido = {
    nome: nome.value,
    telefone: telefone.value,
    endereco: endereco.value,
    itens: carrinho,
    codigo: codigo,
    status: "⏳ Aguardando pagamento"
  };

  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  // WHATSAPP AUTOMÁTICO
  let msg = `🍽️ NOVO PEDIDO K-OMFOME
Nome: ${pedido.nome}
Telefone: ${pedido.telefone}
Endereço: ${pedido.endereco}
Código: ${codigo}
Status: ${pedido.status}`;

  let url = `https://wa.me/55SEUNUMEROAQUI?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");

  document.getElementById("statusPedido").innerText = pedido.status;
  document.getElementById("codigo").innerText = "Código: " + codigo;
}

// ADMIN
function carregarAdmin() {
  let dados = JSON.parse(localStorage.getItem("pedidos")) || [];

  let html = "";

  dados.forEach((p, i) => {
    html += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.status}</p>
        <button onclick="atualizar(${i}, 'Em preparo')">Em preparo</button>
        <button onclick="atualizar(${i}, 'Saiu para entrega')">Entrega</button>
        <button onclick="atualizar(${i}, 'Entregue')">Finalizar</button>
      </div>
    `;
  });

  document.getElementById("painel").innerHTML = html;
}

// STATUS UPDATE REAL TIME
function atualizar(i, status) {
  let dados = JSON.parse(localStorage.getItem("pedidos"));
  dados[i].status = status;
  localStorage.setItem("pedidos", JSON.stringify(dados));
  carregarAdmin();
}

render();
atualizarCarrinho();
