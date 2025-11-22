using Microsoft.AspNetCore.Mvc;
using ApiRestaurante.Models;


[ApiController]
[Route("api/[controller]")]
public class RestaurantesController : ControllerBase
{
//retorna lista fixa de restaurantes
[HttpGet]
public ActionResult<IEnumerable<Restaurante>> Get()
{
var lista = new List<Restaurante>
{


        // --- RESTAURANTE 1 ---
        new Restaurante
        {
            Id = 1,
            Nome = "Sabor & Arte Grill",
            Logo = "arte_grill.png", 
            Endereco = "Rua das Palmeiras, 128",
            Cidade = "Ribeirão Preto",
            Estado = "São Paulo",
            Telefone = "(16) 99123-4567",
            Classificacao = 4.5m
        }, 

        // --- RESTAURANTE 2 ---
        new Restaurante
        {
            Id = 2,
            Nome = "Bendito Burger",
            Logo = "bendito_burguer.png",
            Endereco = "Av. Central, 450",
            Cidade = "Araraquara",
            Estado = "São Paulo",
            Telefone = "(16) 99321-8524",
            Classificacao = 4.9m
        }, 

        // --- RESTAURANTE 3 ---
        new Restaurante
        {
            Id = 3,
            Nome = "Boteco do Mané",
            Logo = "boteco_mane.png",
            Endereco = "Rua dos Estudantes, 312",
            Cidade = "Bebedouro",
            Estado = "São Paulo",
            Telefone = "(17) 99188-4477",
            Classificacao = 4.3m
        }, 

        // --- RESTAURANTE 4 ---
        new Restaurante
        {
            Id = 4,
            Nome = "Massas do Tio Tonho",
            Logo = "massas_tio_tonho.png",
            Endereco = "Av. Itália Nova, 909",
            Cidade = "Matão",
            Estado = "São Paulo",
            Telefone = "(16) 3383-1200",
            Classificacao = 4.1m
        } 
    }; 

    return Ok(lista);
}
} 