using System;
using System.Collections.Generic;

namespace ApiRestaurante.Models 
{
   public class Restaurante
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Logo { get; set; }
        public string? Endereco { get; set; } 
        public string? Cidade { get; set; }   
        public string? Estado { get; set; }   
        public string? Telefone { get; set; }
        public decimal Classificacao { get; set; } 
    }
}
