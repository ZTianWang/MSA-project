namespace MsaBackend.DTO.Product
{
    public class UpdateProductReqDto
    {
        public int Id { get; set; }
        public ProductCategory Category { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public string Image { get; set; } = "defaultItemImg";
        public string Description { get; set; } = string.Empty;
        public int StockQuantity { get; set; } = 0;
        public int SoldQuantity { get; set; } = 0;
    }
}
