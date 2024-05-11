using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Data;

[Index(nameof(Code), nameof(Value), Name = "idx_code_value")]
public class Item
{
    public int Id { get; set; }
    public int Code { get; set; }

    [StringLength(255)] public string Value { get; set; }
}