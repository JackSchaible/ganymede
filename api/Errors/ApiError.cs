namespace api.Errors
{
  public class ApiError
  {
    public string Field { get; set; }
    public string ErrorCode { get; set; }

    public ApiError()
    {
    }

    public ApiError(string field, string errorCode)
    {
      Field = field;
      ErrorCode = errorCode;
    }
  }
}
