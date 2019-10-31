using System.Collections.Generic;

namespace Ganymede.Api.Models.Api
{
    public class ApiResponse
    {
        public string StatusCode { get; set; }
        public List<ApiError> ApiErrors { get; set; }
        public int InsertedID { get; set; }
        public int ParentID { get; set; }
    }
}