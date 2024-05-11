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

    /// <summary>
    /// Retrieves codes based on filter criteria.
    /// </summary>
    /// <param name="code">Filter by code number (optional).</param>
    /// <param name="value">Filter by associated value (optional).</param>
    /// <param name="skip">Number of entries to skip (default is 0).</param>
    /// <param name="take">Number of entries to take (default is 10).</param>
    /// <returns>A list of codes matching the criteria.</returns>
    [HttpGet]
    public IActionResult Get(
        [FromQuery] int? code,
        [FromQuery] string value,
        [FromQuery] int skip = 0,
        [FromQuery] int take = 10)
    {
        var result = codes.Search(code, value, skip, take);
        return Ok(result);
    }
}