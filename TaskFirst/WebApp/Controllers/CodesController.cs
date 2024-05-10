using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class CodesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Works!");
    }
}