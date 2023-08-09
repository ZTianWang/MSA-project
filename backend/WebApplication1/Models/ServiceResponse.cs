namespace MsaBackend.Models
{
    /// <summary>
    ///     Define the struct responded to client
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ServiceResponse
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; } = string.Empty;
    }
    public class ServiceResponse<T> : ServiceResponse
    {
        public T? Data { get; set; }
        //public bool Success { get; set; } = true;
        //public string Message { get; set; } = string.Empty;
    }

    
}
