using WebApp.Data;
using WebApp.Services.Codes.Models;

namespace WebApp.Services.Codes;

public interface ICodeService
{
    Task InsertBunchAsync(List<Dictionary<int, string>> list);
    SearchResponse<Item> Search(int? code, string value, int skip = 0, int take = 10);
}