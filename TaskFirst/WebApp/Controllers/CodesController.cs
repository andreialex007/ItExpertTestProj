using Microsoft.AspNetCore.Mvc;
using WebApp.Services.Codes;

namespace WebApp.Controllers;

[ApiController]
[Route("codes")]
public class CodesController(ICodeService codes) : ControllerBase
{
    /// <summary>
    /// Posts a new set of code mappings.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /codes
    ///     [
    ///         {
    ///             "1": "Value1"
    ///         },
    ///         {
    ///             "2": "Value2"
    ///         },
    ///         {
    ///             "3": "Value3"
    ///         }
    ///     ]
    ///
    /// </remarks>
    /// <param name="items">List of dictionaries representing code mappings.</param>
    /// <returns>A status indicating success.</returns>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] List<Dictionary<int, string>> items)
    {
        await codes.InsertBunchAsync(items);
        return Ok();
    }
}