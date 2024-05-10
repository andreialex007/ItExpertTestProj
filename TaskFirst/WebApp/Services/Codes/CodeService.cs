﻿using Microsoft.EntityFrameworkCore;
using WebApp.Common;
using WebApp.Data;

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
        await db.BulkCopyListAsync("Items", items, x => x.Code, x => x.Value);
    }
}