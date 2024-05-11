namespace WebApp.Services.Codes.Models;

public class SearchResponse<T>
{
    public int Total { get; set; }
    public int Filtered { get; set; }
    public List<T> Items { get; set; }
}