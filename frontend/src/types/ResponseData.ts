export default interface ResponseData {
  data: any;
}

export function getErrorMessage(error: Error & { response: ResponseData }) {
  return error.response.data || error.message;
}
