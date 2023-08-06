namespace MsaBackend
{
    /// <summary>
    /// Configurate AutoMapper
    /// </summary>
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<Product, GetProductResDto>();
            CreateMap<AddProductReqDto, Product>();
            CreateMap<UpdateProductReqDto, Product>();
        }
    }
}
