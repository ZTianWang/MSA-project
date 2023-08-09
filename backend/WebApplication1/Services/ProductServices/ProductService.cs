namespace MsaBackend.Services.ProductServices
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public ProductService(IMapper mapper, DataContext dataContext)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }
        public async Task<ServiceResponse<GetProductResDto>> AddProduct(AddProductReqDto newProduct)
        {
            var res = new ServiceResponse<GetProductResDto>();
            var product = _mapper.Map<Product>(newProduct);
            _dataContext.Add(product);
            await _dataContext.SaveChangesAsync();
            res.Message = "Add item success!";
            res.Data = _mapper.Map<GetProductResDto>(product);
            return res;
        }

        public async Task<ServiceResponse> DeleteProductByID(int id)
        {
            var product = await _dataContext.Products.FindAsync(id);
            var res = new ServiceResponse();
            if (product is null)
            {
                res.Success = false;
                res.Message = "Item not found!";
            }
            else
            {
                product.IsDelete = true; 
                await _dataContext.SaveChangesAsync();
                res.Message = "Item deleted!";
            }
            return res;
        }

        public async Task<ServiceResponse<List<GetProductResDto>>> GetAllProducts()
        {
            //var products = await _dataContext.Products.ToListAsync();
            var products = await _dataContext.Products
                .Where(product => product.IsDelete == false)
                .ToListAsync();
            var res = new ServiceResponse<List<GetProductResDto>>
            {
                Data = products.Select(_mapper.Map<GetProductResDto>).ToList()
            };
            return res;
        }

        public async Task<ServiceResponse<GetProductResDto>> GetProductById(int id)
        {
            var item = await _dataContext.Products.FindAsync(id);
            var res = new ServiceResponse<GetProductResDto>();
            if (item is null)
            {
                res.Success = false;
                res.Message = "Item not found!";
            }
            else
            {
                res.Data = _mapper.Map<GetProductResDto>(item);
            }
            return res;
        }

        public async Task<ServiceResponse<GetProductResDto>> UpdateProduct(UpdateProductReqDto updatedProduct)
        {
            var res = new ServiceResponse<GetProductResDto>();
            try
            {
                var product = await _dataContext.Products.FirstOrDefaultAsync(p => p.Id == updatedProduct.Id) 
                    ?? throw new Exception($"Item with Id `{updatedProduct.Id}` not found!");
                _mapper.Map(updatedProduct, product);
                await _dataContext.SaveChangesAsync();
                res.Data = _mapper.Map<GetProductResDto>(product);
                
            }catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
            }
            return res; 
        }
    }
}
