from rest_framework.exceptions import APIException

class InvalidTokenException(APIException):
    status_code = 401
    default_detail = 'Invalid or expired token'
    default_code = 'invalid_token'

class ConsentExpiredException(APIException):
    status_code = 403
    default_detail = 'Consent has expired'
    default_code = 'consent_expired'

class AccessLimitExceededException(APIException):
    status_code = 429
    default_detail = 'Access limit exceeded'
    default_code = 'limit_exceeded'