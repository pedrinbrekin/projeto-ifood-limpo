const API_BASE_URL = 'http://localhost:5293/api/Restaurantes'; 

//variável global para armazenar todos os dados dos restaurantes após o carregamento da API
let todosRestaurantes = []; 


 //função principal para carregar os dados da API C#.
 function loadRestaurantes() {
    $('#loading-message').show();
    $('#restaurantes-list').empty();
    $('#error-message').addClass('d-none'); 

    $.ajax({
        url: API_BASE_URL,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#loading-message').hide();
            
            if (data && data.length > 0) {
                //armazena os dados na variável global para uso no filtro de busca
                todosRestaurantes = data; 
                
                //renderiza todos os restaurantes inicialmente
                renderRestaurantes(todosRestaurantes); 
            } else {
                $('#restaurantes-list').append('<p class="col-12 text-center text-muted">API retornou lista vazia.</p>');
            }
        },
        error: function(xhr, status, error) {
            $('#loading-message').hide();
            console.error("Erro ao carregar restaurantes:", status, error, xhr);
            
            //exibe mensagem de erro detalhada de conexão
            $('#error-message').removeClass('d-none').html(`
                <h4>❌ Erro de Conexão com a API</h4>
                <p>Verifique se o serviço C# está rodando na porta ${API_BASE_URL.split(':')[2].split('/')[0]} e se o CORS está configurado.</p>
            `);
        }
    });
}

/**
 * //função para renderizar uma lista de restaurantes na tela.
  @param {Array} lista 
 */
function renderRestaurantes(lista) {
    const $container = $('#restaurantes-list');
    $container.empty();
    
    if (lista.length === 0) {
        $container.append('<p class="col-12 text-center text-muted mt-5">Nenhum restaurante encontrado. Tente outra busca.</p>');
        return;
    }

    $.each(lista, function(index, restaurante) {
        const cardHtml = createRestauranteCard(restaurante);
        $container.append(cardHtml);
    });

    //anexa o evento de clique a todos os cards (caso o botão não seja clicado)
    $('.restaurante-card').on('click', handleRestauranteClick);
}


 //cria o HTML para um único card de restaurante.
 
function createRestauranteCard(restaurante) {
    
    const classificacaoFormatada = (restaurante.classificacao !== undefined) ? restaurante.classificacao.toFixed(1) : 'N/A';
    
    //simulação do tempo de entrega
    const tempoEntrega = "30-45 min";

    return `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card restaurante-card shadow-lg h-100 p-3" data-id="${restaurante.id}">
                <div class="card-body text-center d-flex flex-column align-items-center">
                    
                    <img src="./img/${restaurante.logo}" class="restaurante-logo-lg" alt="Logo ${restaurante.nome}">
                    
                    <h5 class="card-title mt-3 mb-1">${restaurante.nome}</h5>
                    <p class="card-text small text-muted mb-2">${restaurante.cidade} - ${restaurante.estado}</p>
                    
                    <div class="d-flex justify-content-center align-items-center mt-2 mb-4">
                        <span class="badge bg-success me-3"><i class="bi bi-star-fill"></i> ${classificacaoFormatada}</span>
                        
                        <span class="text-muted small">
                            <i class="bi bi-clock-fill me-1"></i> ${tempoEntrega}
                        </span>
                    </div>
                    
                    <button class="btn btn-danger mt-auto w-75" 
                            data-id="${restaurante.id}"
                            onclick="handleRestauranteClick.call(this)">
                        Conferir Cardápio <i class="bi bi-arrow-right-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

//manipula o clique no card ou botão para navegar para o cardápio.
 
function handleRestauranteClick() {
    //pega o ID do restaurante do atributo 'data-id' do card ou botão
    const restauranteId = $(this).data('id') || $(this).closest('.restaurante-card').data('id');

    if (restauranteId) {
        //requisito: Enviar o ID do restaurante na URL para cardapio.html
        window.location.href = `cardapio.html?id=${restauranteId}`;
    }
}


//lógica de inicialização ao carregar o documento

$(function(){
    //inicia o processo de carregamento dos dados da API
    loadRestaurantes();

    //adiciona o evento de digitação para filtrar os restaurantes
    $('#searchRestaurantes').on('keyup', function() {
        const termo = $(this).val().toLowerCase();
        
        const resultadosFiltrados = todosRestaurantes.filter(restaurante => {
            //filtra por Nome, Cidade ou Estado (tornando a busca funcional)
            return restaurante.nome.toLowerCase().includes(termo) ||
                   restaurante.cidade.toLowerCase().includes(termo) ||
                   restaurante.estado.toLowerCase().includes(termo);
        });

        renderRestaurantes(resultadosFiltrados);
    });
});