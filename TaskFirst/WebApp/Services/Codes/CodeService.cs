using Microsoft.EntityFrameworkCore;
using WebApp.Common;
using WebApp.Data;
using WebApp.Services.Codes.Models;

namespace WebApp.Services.Codes;

public class CodeService(AppDbContext db) : ICodeService
{
    public async Task InsertBunchAsync(List<Dictionary<int, string>> list)
    {
        var items = list
            .Select(x => x.Select(e => new Item() {Code = e.Key, Value = e.Value}))
            .SelectMany(x => x)
            .OrderBy(x => x.Code)
            .ToList();

        await db.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Items; DBCC CHECKIDENT ('Items', RESEED, 1);");
        await db.BulkCopyListAsync("Items",
            items,
            x => x.Code,
            x => x.Value);
    }

    public SearchResponse<Item> Search(int? code, string value, int skip = 0, int take = 10)
    {
        var query = db.Items.AsQueryable();
        var total = query.Count();

        if (code > 0)
            query = query.Where(x => x.Code == code);

        if (!string.IsNullOrWhiteSpace(value))
            query = query.Where(x => x.Value.ToLower().Contains(value.ToLower()));

        var filtered = query.Count();

        var items = query
            .TakePage(skip, take)
            .ToList();

        return new SearchResponse<Item>
        {
            Total = total,
            Filtered = filtered,
            Items = items
        };
    }
}