using MsaBackend.DTO.Product;

namespace MsaBackend.Services.ProductServices
{
    public interface IProductService
    {
        Task<ServiceResponse<List<GetProductResDto>>> GetAllProducts();
        Task<ServiceResponse<GetProductResDto>> GetProductById(int id);
        Task<ServiceResponse<GetProductResDto>> AddProduct(AddProductReqDto newProduct);
        Task<ServiceResponse<GetProductResDto>> UpdateProduct(UpdateProductReqDto updatedProduct);
        Task<ServiceResponse> DeleteProductByID(int id);
    }
}
