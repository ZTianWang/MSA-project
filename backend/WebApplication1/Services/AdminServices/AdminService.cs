using MsaBackend.DTO.Admin;

namespace MsaBackend.Services.AdminServices
{
    public class AdminService : IAdminService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        //private readonly IHttpContextAccessor _httpContextAccessor;

        public AdminService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<AuthorizeAdminResDto>> AuthorizeAdmin(AuthorizeAdminReqDto reqData)
        {
            var res = new ServiceResponse<AuthorizeAdminResDto>();
            var admin = await _dataContext.Admins
                .FirstOrDefaultAsync(admin => admin.Account == reqData.Account && admin.Password == reqData.Password);
            if (admin is not null)
            {
                res.Message = "Login success!";
            }
            else
            {
                res.Success = false;
                res.Message = "Illegal account or password!";
            }
            return res;
        }
    }
}
