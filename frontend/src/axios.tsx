import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL="https://hudsonbackend.hudsonburnham.ai/"
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("access_token")))}`

export async function loginRequest(data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<any>> {
  return await axios({
    method: "post",
    url: `auth/login`,
    data: data,
  });
}
export async function registerUserRequest(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AxiosResponse<any>> {
  return await axios({
    method: "post",
    url: `auth/register`,
    data: data,
  });
}

export async function forgotPassword(data: {
  email: string;
}): Promise<AxiosResponse<any>> {
  return await axios({
    method: "post",
    url: `auth/forgot`,
    data: data,
  });
}

export async function editUser(data: FormData): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'post',
    url: `/user`,
    data: data
  })
}

export async function getUser(data: {userId: string}): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'get',
    url: `/user/${data.userId}`
  })
}

export async function searchUsers(data: {user: string, userId: string}): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'get',
    url: `/user?searchUser=${data.user}&id=${data.userId}`
  })
} 

export async function createNewChat(data: {
  userId: string;
  id: string;
}): Promise<AxiosResponse<any>> {
  return await axios({
      method: 'post',
      url: 'chat',
      data: data
  })
}

export async function fetchAllChats(data: {
    userId: string;
}): Promise<AxiosResponse<any>> {
    return await axios({
        method: 'post',
        url: 'chat/all',
        data: data
    })
}


export async function fetchChatMessage(data: {
    chatId: string;
}): Promise<AxiosResponse<any>> {
    return await axios({
        method: 'get',
        url: `messages/${data.chatId}`,
    })
}

export async function sendMessage(data: FormData): Promise<AxiosResponse<any>> {
    return await axios({
        method: 'post',
        url: 'messages',
        data: data,
    })
}
export async function createPayment(): Promise<AxiosResponse<any>> {
  return await axios({
      method: 'post',
      url: 'payment',
      data: JSON.stringify({})
  })
}

export async function getLeaderboardData(): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'get',
    url: `/hubspot/leaderboard`
  })
}


let refresh = false
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 403 && !refresh) {
      refresh = true
      try {
        const response = await axios({
          method: "post",
          url: `auth/refresh`,
          withCredentials: true
        }) ;
        console.log("on error , access token",localStorage.getItem("access_token"));
        console.log("on error : beaere token",axios.defaults.headers.common["Authorization"])

        if (response.status < 300) {
          refresh = true
          localStorage.setItem("access_token", response.data.accessToken);

          error.response.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
          
          return axios(error.response.config);
        }
      } catch(error) {
        //set the error banner to logout and do login once again
        console.log("hi I am error in refresh call", error)
      }
    }
    refresh = false
    return Promise.reject(error);
  }
);