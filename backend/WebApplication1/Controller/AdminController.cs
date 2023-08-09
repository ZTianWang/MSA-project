using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MsaBackend.DTO.Admin;
using MsaBackend.Services.AdminServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace MsaBackend.Controller
{
    [ApiController]
    [Route("/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly RSA _rsaKey;

        public AdminController(IAdminService adminService, RSA rsaKey)
        {
            _adminService = adminService;
            _rsaKey = rsaKey;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<ServiceResponse<string>>> AuthorizeAdmin(AuthorizeAdminReqDto reqData)
        {
            var res = await _adminService.AuthorizeAdmin(reqData);
            if (res.Success)
            {
                var key = new RsaSecurityKey(_rsaKey);
                var claims = new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, "MSA_project"),
                    new Claim(JwtRegisteredClaimNames.Iss, "MSA.Leon"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Exp,  DateTimeOffset.UtcNow.AddDays(7).ToUnixTimeSeconds().ToString()),
                    new Claim("Role","Admin")
                };
                var token = new JwtSecurityToken(
                    issuer: "MSA.Leon",
                    audience: "admin",
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.RsaSha256Signature));
                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                res.Data = new AuthorizeAdminResDto
                {
                    Token = jwtToken
                };
                return Ok(res);
            }
            else
            {
                return Unauthorized(res);
            }
        }
    }
}
