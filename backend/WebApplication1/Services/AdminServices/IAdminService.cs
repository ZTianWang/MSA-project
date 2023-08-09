using MsaBackend.DTO.Admin;

namespace MsaBackend.Services.AdminServices
{
    public interface IAdminService
    {
        Task<ServiceResponse<AuthorizeAdminResDto>> AuthorizeAdmin(AuthorizeAdminReqDto admin);
    }
}
