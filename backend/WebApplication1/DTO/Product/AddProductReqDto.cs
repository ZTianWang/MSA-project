namespace MsaBackend.DTO.Product
{
    public class AddProductReqDto
    {
        public ProductCategory Category { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public string Image { get; set; } = "defaultItemImg";
        public string Description { get; set; } = string.Empty;
        public int StockQuantity { get; set; } = 0;
        public int SoldQuantity { get; set; } = 0;
    }
}
