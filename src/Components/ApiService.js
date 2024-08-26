import { API_BASE_URL } from "./AppConfig";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then(response => {
      if (response.status === 204) {
        // No content
        return null;
      }
      return response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    })
    .catch((error) => {
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = "/login"; // redirect
      }
      return Promise.reject(error);
    });

}

export function signin(userDTO) {
  return call("/api/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
    }
    return response;
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/";
}

export function signup(userDTO) {
  return call("/api/auth/signup", "POST", userDTO)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error during sign-up:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    });
}

export function checkUserId(userDTO) {
  return call("/api/auth/checkUserID", "POST", userDTO)
    .then((response) => {
      alert("사용 가능한 아이디입니다.");
      return response;
    })
    .catch((error) => {
      console.error("Error during user ID check:", error);
      alert("중복된 아이디가 존재합니다. 다시 입력해주세요.");
    });
}
