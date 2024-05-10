namespace WebApp.Services.Codes;

public interface ICodeService
{
    Task InsertBunchAsync(List<Dictionary<int, string>> list);
}