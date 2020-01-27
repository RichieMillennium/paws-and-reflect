import axios, {
  AxiosInstance,
  AxiosResponse,
  CancelToken,
  CancelTokenSource
} from "axios";

type ApiGet = (
  url: string,
  cancelToken?: CancelToken
) => Promise<AxiosResponse<any>>;
type GetCancelTokenSource = () => CancelTokenSource;

const api: AxiosInstance = axios.create({ timeout: 10000 });

export const getCancelTokenSource: GetCancelTokenSource =
  axios.CancelToken.source;

export const apiGet: ApiGet = (url, cancelToken?) =>
  api.get(url, { cancelToken });
