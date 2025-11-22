const PRODUTOS_DETALHES_API_URL = 'http://localhost:5293/api/Produtos/Detalhes';

$(function() {
    loadProdutoDetalhes();
});

function loadProdutoDetalhes() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idProduto = urlParams.get('id');

    if (!idProduto) {
        $('#loading-message').html('<h4 class="text-danger">Erro: ID do produto não especificado na URL.</h4>');
        return;
    }

    $.ajax({
        // chama o endpoint: /api/Produtos/Detalhes/{idProduto}
        url: `${PRODUTOS_DETALHES_API_URL}/${idProduto}`,
        method: 'GET',
        dataType: 'json',
        success: function(produto) {
            $('#loading-message').hide();
            
            // verificação: produto foi encontrado
            if (produto && produto.id) {
                renderDetalhes(produto);
            } else {
                $('#loading-message').html('<h4 class="text-warning">Produto não encontrado.</h4>');
            }
        },
        error: function(xhr, status, error) {
            $('#loading-message').hide();
            $('#error-message').removeClass('d-none').text(`Erro ao buscar detalhes: ${xhr.statusText}. Verifique a API de Produtos.`);
        }
    });
}

function renderDetalhes(produto) {
    const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
    
    // atualiza o nome do produto no cabeçalho
    $('#produto-nome-header').text(produto.nome);

    const detalhesHtml = `
        <div class="col-lg-6 col-md-12 text-center mb-4">
            <img src="img/${produto.logo}" class="img-fluid rounded-3 shadow-lg" alt="${produto.nome}">
        </div>
        
        <div class="col-lg-6 col-md-12">
            <h1 class="display-5 fw-bold text-danger">${produto.nome}</h1>
            
            <p class="lead text-muted">${produto.detalhes}</p>
            
            <div class="mb-4 p-3 bg-white rounded shadow-sm">
                <h4 class="h5 mb-2"><i class="bi bi-list-stars me-2"></i> Ingredientes Principais:</h4>
                <p class="mb-0 small">${produto.ingredientes}</p>
            </div>
            
            <div class="mb-4">
                <strong>Tamanho:</strong> 
                <span class="badge bg-primary fs-6">${produto.tamanho}</span>
            </div>
            
        </div>
    `;

    $('#detalhe-produto').html(detalhesHtml).removeClass('d-none');
    $('#preco-final').text(`R$ ${precoFormatado}`);
}