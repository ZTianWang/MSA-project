namespace MsaBackend.DTO.Product
{
    public class UpdateProductReqDto
    {
        public int Id { get; set; }
        public ProductCategory Category { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int StockQuantity { get; set; }
        public int SoldQuantity { get; set; }
    }
}
