using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MsaBackend.Controller
{
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    [Route("/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        //[Route("getItemList")]
        public async Task<ActionResult<ServiceResponse<List<GetProductResDto>>>> GetProductList()
        {
            var res = await _productService.GetAllProducts();
            return res.Success ? Ok(res) : BadRequest(res);
        }

        [HttpGet("{id}")]
        //[Route("getItem/{id}")]
        public async Task<ActionResult<ServiceResponse<GetProductResDto>>> GetProductById(int id)
        {
            var res = await _productService.GetProductById(id);
            return res.Success
                ? Ok(res)
                : NotFound(res);
        }

        [HttpPost]
        //[Route("addItem")]
        public async Task<ActionResult<ServiceResponse<GetProductResDto>>> AddProduct(AddProductReqDto newProduct)
        {
            var res = await _productService.AddProduct(newProduct);
            return res.Success ? Ok(res) : BadRequest(res);
        }

        [HttpPut]
        //[Route("updateItem")]
        public async Task<ActionResult<ServiceResponse<GetProductResDto>>> UpdateProduct(UpdateProductReqDto updatedProduct)
        {
            var res = await _productService.UpdateProduct(updatedProduct);
            return res.Success
                ? Ok(res)
                : BadRequest(res);
        }

        [HttpDelete("{id}")]
        //[Route("deleteItem/{id}")]
        public async Task<ActionResult> DeleteProductById(int id)
        {
            var res = await _productService.DeleteProductByID(id);
            return res.Success ? Ok(res) : NotFound(res);
        }
    }
}
