using System.Collections.Generic;

namespace api.ViewModels.Models.Api
{
    public class ApiResponse
    {
        public string StatusCode { get; set; }
        public List<ApiError> ApiErrors { get; set; }
    }
}