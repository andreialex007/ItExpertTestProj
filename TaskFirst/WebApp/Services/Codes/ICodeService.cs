using WebApp.Data;

namespace WebApp.Services.Codes;

public interface ICodeService
{
    Task InsertBunchAsync(List<Dictionary<int, string>> list);
    List<Item> Search(int? code, string value, int skip = 0, int take = 10);
}