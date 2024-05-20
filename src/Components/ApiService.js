import { API_BASE_URL } from "./AppConfig";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // POST, PUT, PATCH method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      // 응답이 정상적으로 처리되지 않았을 경우 에러 처리
      if (!response.ok) {
        return Promise.reject("Error: " + response.statusText);
      }
      return response.json(); // JSON 형식으로 응답을 파싱하여 반환
    })
    .then((json) => {
      return json; // 파싱된 JSON 데이터 반환
    })
    .catch((error) => {
      console.error("API call error:", error);
      return Promise.reject(error); // 에러 발생 시 에러를 반환
    });
}