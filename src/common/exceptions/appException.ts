import { AppExceptionType, HttpStatus} from "@/common/constants/exception.enum";

export class AppException extends Error {
  public status: HttpStatus | number;
  public message: AppExceptionType | string;

  constructor(status: HttpStatus | number, message: AppExceptionType | string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
