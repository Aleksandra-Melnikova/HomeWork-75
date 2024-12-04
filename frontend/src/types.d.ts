export interface IForm {
  decoded: string;
  password: string;
  encoded: string;
}

export interface FormDecode {
  decoded: string;
  password: string;
}

export interface DecodeResponse {
  decoded: string;
}

export interface FormEncode {
  encoded: string;
  password: string;
}
