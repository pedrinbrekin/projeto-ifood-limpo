using Microsoft.AspNetCore.Mvc;
using ApiRestaurante.Models;
using System.Collections.Generic;
using System.Linq; 

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private List<Produto> GetDadosCardapio()
    {
        return new List<Produto>
        {
            //pratos restaurante 1 (Sabor & Arte Grill)
            new Produto { Id = 101, Nome = "Picanha Premium", Logo = "picanha.jpg", IdRestaurante = 1, Tamanho = "Grande", Ingredientes = "Picanha, Farofa, Vinagrete", Detalhes = "Carne nobre e macia grelhada no ponto.", Preco = 95.00m },
            new Produto { Id = 102, Nome = "Salmão ao Molho Ervas", Logo = "salmao.jpg", IdRestaurante = 1, Tamanho = "Médio", Ingredientes = "Salmão, Limão, Ervas Finas", Detalhes = "Acompanha legumes cozidos no vapor.", Preco = 72.50m },
            
            //pratos restaurante 2 (Bendito Burger)
            new Produto { Id = 201, Nome = "Burger Clássico", Logo = "burger_classico.jpg", IdRestaurante = 2, Tamanho = "Único", Ingredientes = "Pão, Carne 180g, Queijo, Bacon", Detalhes = "Nosso carro chefe, sabor incomparável.", Preco = 45.00m },
            new Produto { Id = 202, Nome = "Batata Rústica", Logo = "batata.jpg", IdRestaurante = 2, Tamanho = "Grande", Ingredientes = "Batata, Alecrim, Sal Grosso", Detalhes = "Porção crocante e bem temperada.", Preco = 25.00m },
            
            //pratos restaurante 3 (Boteco do Mané)
            new Produto { Id = 301, Nome = "Porção de Pastel", Logo = "pastel.jpg", IdRestaurante = 3, Tamanho = "Grande", Ingredientes = "Carne, Queijo, Frango", Detalhes = "10 unidades de pasteis mistos.", Preco = 49.90m },
            
            //pratos restaurante 4 (Massas do Tio Tonho)
            new Produto { Id = 401, Nome = "Lasanha Bolonhesa", Logo = "lasanha.jpg", IdRestaurante = 4, Tamanho = "Individual", Ingredientes = "Massa, Carne Moída, Molho Pomodoro", Detalhes = "Nossa receita tradicional, gratinada.", Preco = 55.00m }
        };
    }

    //retorna o cardápio filtrado por IdRestaurante
    [HttpGet("{idRestaurante}")]
    public ActionResult<IEnumerable<Produto>> Get(int idRestaurante)
    {
        var cardapioFiltrado = GetDadosCardapio()
                               .Where(p => p.IdRestaurante == idRestaurante)
                               .ToList();

                              
        if (!cardapioFiltrado.Any())
        {
            return NotFound($"Nenhum cardápio encontrado para o restaurante ID {idRestaurante}.");
        }
        
        return Ok(cardapioFiltrado);
    }

    //retorna os detalhes de um produto específico pelo Id do produto

    [HttpGet("Detalhes/{id}")]
    public ActionResult<Produto> GetDetalhes(int id)
    {
    //usa o GetDadosCardapio() e filtra pelo Id do produto (não do restaurante)
    var produto = GetDadosCardapio()
                           .FirstOrDefault(p => p.Id == id);
                           
    Console.WriteLine($"API recebeu ID de Produto: {id}. Produto encontrado: {(produto != null)}");

    if (produto == null)
    {
        return NotFound($"Produto com ID {id} não encontrado.");
    }

    return Ok(produto);
}
}