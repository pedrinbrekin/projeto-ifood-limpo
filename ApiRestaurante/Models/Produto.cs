using System;
using System.Collections.Generic;

namespace ApiRestaurante.Models 
{
    public class Produto
    {
        public Produto()
        {
            Nome = string.Empty;
            Logo = string.Empty;
            Tamanho = string.Empty;
            Ingredientes = string.Empty;
            Detalhes = string.Empty;
        }
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Logo { get; set; } 
        public int IdRestaurante { get; set; }
        public string Tamanho { get; set; }
        public string Ingredientes { get; set; }
        public string Detalhes { get; set; }
        public decimal Preco { get; set; } 
    }
}