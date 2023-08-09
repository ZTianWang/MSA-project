namespace MsaBackend.DTO.Admin
{
    public class AuthorizeAdminReqDto
    {
        public string Account { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
