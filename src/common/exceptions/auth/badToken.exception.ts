import { AppException } from "@/common/exceptions";
import { AppExceptionType, HttpStatus } from "@/common/constants/exception.enum";

export class BadTokenException extends AppException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, AppExceptionType.BAD_TOKEN);
  }
}
