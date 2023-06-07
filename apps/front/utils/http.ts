import { Nullable, Optional } from "./type";

const DISPOSITION_FILENAME_KEY = "filename=";
const DISPOSITION_TYPE_ATTACHMENT = "attachment";

export type ApiError = {
  code: string;
  detail: string;
  name?: Nullable<Optional<string>>;
  source?: Nullable<Optional<string>>;
  value?: Nullable<Optional<string>>;
};

export type HttpError = {
  error: {
    status: number;
    message: string;
    errors?: Optional<ApiError[]>;
  };
};

export type HttpResponse<T = undefined> = T | HttpError;

export const HTTP_STATUS_CODE_BAD_REQUEST = 400;

export const HTTP_STATUS_CODE_FORBIDDEN = 403;
export const HTTP_STATUS_CODE_CONFLICT = 409;
export const HTTP_STATUS_CODE_CREATED = 201;
export const HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR = 500;
export const HTTP_STATUS_CODE_NO_CONTENT = 204;
export const HTTP_STATUS_CODE_NOT_FOUND = 404;
export const HTTP_STATUS_CODE_OK = 200;
export const HTTP_STATUS_CODE_UNPROCESSABLE_ENTITY = 422;

export class HttpClient {
  constructor(
    private readonly defaultBaseUrl: string = "",
    private readonly defaultConfigHeaders: HeadersInit = {},
    private readonly log: boolean = false
  ) {}

  private async request<ResponseType = undefined>(
    url: string,
    config: RequestInit
  ): Promise<ResponseType> {
    const requestInit: RequestInit = {
      ...config,
      headers: {
        ...this.defaultConfigHeaders,
        ...config.headers,
      },
    };
    let response: Response | undefined;

    try {
      response = await fetch(`${this.defaultBaseUrl}${url}`, requestInit);

      if (!response.ok) {
        const responseJson = await response.json();
        return Promise.reject(
          (responseJson as HttpError).error
            ? responseJson // => keep & return existing error
            : {
                error: {
                  status: response.status,
                  message: response.statusText,
                  ...responseJson,
                },
              }
        );
      }

      const disposition = response.headers.get("content-disposition");
      if (disposition) {
        const [dispositionType, dispositionFilename] = disposition.split(";");
        if (
          dispositionType === DISPOSITION_TYPE_ATTACHMENT &&
          dispositionFilename
        ) {
          const [, filename] = dispositionFilename.split(
            DISPOSITION_FILENAME_KEY
          );
          const data = Buffer.from(
            new Uint8Array(await response.arrayBuffer())
          );

          return Promise.resolve({
            data,
            filename,
          }) as Promise<ResponseType>; // => FileDTO
        }
      }

      if (response.status !== HTTP_STATUS_CODE_NO_CONTENT) {
        return response.json() as Promise<ResponseType>;
      }

      return Promise.resolve(undefined) as Promise<ResponseType>; // => undefined
    } catch (err) {
      return Promise.reject({
        error: {
          status: HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
          message: "Internal Server Error",
        },
      });
    }
  }

  public async delete<ResponseType = undefined>(
    url: string,
    config: RequestInit = {}
  ) {
    return this.request<ResponseType>(url, { ...config, method: "DELETE" });
  }

  public async get<ResponseType = undefined>(
    url: string,
    config: RequestInit = {}
  ) {
    return this.request<ResponseType>(url, { ...config, method: "GET" });
  }

  public async patch<BodyType, ResponseType = undefined>(
    url: string,
    body: BodyType,
    config: RequestInit = {}
  ) {
    return this.request<ResponseType>(url, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  public async post<BodyType, ResponseType = undefined>(
    url: string,
    body: BodyType,
    config: RequestInit = {}
  ) {
    return this.request<ResponseType>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public async put<BodyType, ResponseType = undefined>(
    url: string,
    body: BodyType,
    config: RequestInit = {}
  ) {
    return this.request<ResponseType>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
}

export function isHttpError<T>(
  response: HttpResponse<T>
): response is HttpError {
  return typeof (response as HttpError)?.error !== "undefined";
}
