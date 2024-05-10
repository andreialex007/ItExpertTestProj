using Microsoft.AspNetCore.Mvc;
using WebApp.Services.Codes;

namespace WebApp.Controllers;

[ApiController]
[Route("codes")]
public class CodesController(ICodeService codes) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] List<Dictionary<int, string>> items)
    {
        await codes.InsertBunchAsync(items);
        return Ok();
    }
}