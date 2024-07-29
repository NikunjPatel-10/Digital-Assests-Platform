enum APIResponseCode {
  InternalServerError = 500,
  UnauthorizedAccess = 401,
  Success = 200
}

export default APIResponseCode;
export const {
  InternalServerError,
  UnauthorizedAccess,
  Success
} = APIResponseCode;