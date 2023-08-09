namespace MsaBackend.Models
{
    public class Admin 
    {
        public int Id { get; set; }
        public string Account { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
