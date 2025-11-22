const PRODUTOS_API_URL = 'http://localhost:5293/api/Produtos';
const RESTAURANTES_API_URL = 'http://localhost:5293/api/Restaurantes'; 

$(function() {
    loadCardapio();
});

//helper function para buscar um restaurante pelo ID (simulando a busca na lista total)
function getRestauranteInfo(id) {
    const idString = String(id); 

    if (idString === '1') {
        return { Nome: 'Sabor & Arte Grill', Classificacao: 4.5 };
    } else if (idString === '2') {
        return { Nome: 'Bendito Burger', Classificacao: 4.9 };
    } else if (idString === '3') {
        return { Nome: 'Boteco do Mané', Classificacao: 4.3 }; 
    } else if (idString === '4') {
        return { Nome: 'Massas do Tio Tonho', Classificacao: 4.1 }; 
    }
    //retorno padrão caso o ID não seja encontrado
    return { Nome: 'Restaurante Desconhecido', Classificacao: 0.0 };
}



//função para extrair o ID e carregar o cardápio.
 
function loadCardapio() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idRestaurante = urlParams.get('id');

    if (!idRestaurante) {
        $('#loading-message').text('Erro: ID do restaurante não especificado na URL.');
        return;
    }
    
    //atualiza o header com info básicas
    const info = getRestauranteInfo(idRestaurante);
    $('#restaurante-nome').text(info.Nome);
    $('#restaurante-info').html(`<span class="badge bg-success me-2">${info.Classificacao.toFixed(1)} <i class="bi bi-star-fill"></i></span><i class="bi bi-clock-fill me-1"></i> 30-45 min`);


    $.ajax({
        url: `${PRODUTOS_API_URL}/${idRestaurante}`, 
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#loading-message').hide();
            
            if (data && data.length > 0) {
                const produtosAgrupados = agruparPorPropriedade(data, 'tamanho');
                renderProdutosAgrupados(produtosAgrupados);

            } else {
                $('#loading-message').text('Este restaurante não tem itens no cardápio.');
            }
        },
        error: function(xhr, status, error) {
            $('#loading-message').hide();
            $('#error-message').removeClass('d-none').text(`Erro ao buscar cardápio: ${xhr.statusText}.`);
        }
    });
}


 //helper: agrupa um array de objetos por uma chave de propriedade (ex: 'tamanho').
 
function agruparPorPropriedade(produtos, chave) {
    return produtos.reduce((acc, produto) => {
        //acessamos a chave usando colchetes (produto['tamanho'])
        const grupo = produto[chave]; 
        if (!acc[grupo]) {
            acc[grupo] = [];
        }
        acc[grupo].push(produto);
        return acc;
    }, {});
}



 //renderiza os produtos na tela agrupados por categorias (Tamanho).
 
function renderProdutosAgrupados(grupos) {
    const $container = $('#cardapio-list');
    $container.empty();

    //itera sobre as categorias (chaves do objeto: "Grande", "Médio", "Único")
    for (const categoria in grupos) {
        if (grupos.hasOwnProperty(categoria)) {
            const produtosDaCategoria = grupos[categoria];
            
            //cria o título da categoria
            $container.append(`<h2 class="h4 fw-bold mt-4 mb-3 text-dark">${categoria}</h2>`);

            //renderiza os cards dentro da categoria
            const $categoriaDiv = $('<div class="row g-3">');
            
            produtosDaCategoria.forEach(produto => {
                const cardHtml = createProdutoCard(produto);
                $categoriaDiv.append(cardHtml);
            });
            
            $container.append($categoriaDiv);
        }
    }

    //adiciona o evento de clique após toda a renderização
    $('.produto-card').on('click', handleProdutoClick);
}


 //cria o HTML para um único card de produto (Estilo compacto, como no iFood).
 
function createProdutoCard(produto) {
    const precoFormatado = produto.preco.toFixed(2).replace('.', ',');

    return `
        <div class="col-12">
            <div class="card produto-card shadow-sm" data-id="${produto.id}">
                <div class="row g-0 align-items-center">
                    
                    <div class="col-8">
                        <div class="card-body py-3 px-3">
                            <h5 class="produto-nome mb-1">${produto.nome}</h5>
                            <p class="produto-descricao mb-2">${produto.detalhes}</p>
                            <span class="produto-preco">R$ ${precoFormatado}</span>
                        </div>
                    </div>

                    <div class="col-4 text-end position-relative">
                        <img src="./img/${produto.logo}" class="produto-imagem" alt="${produto.nome}">
                        <div class="add-icon">
                           <i class="bi bi-plus-circle-fill text-danger"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


//manipula o clique no card do produto para navegar para a página de detalhes.
 
function handleProdutoClick() {
    const produtoId = $(this).data('id') || $(this).closest('.produto-card').data('id');
    window.location.href = `detalhes.html?id=${produtoId}`;
}