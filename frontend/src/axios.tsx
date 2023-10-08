import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL="http://localhost:3000"
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem("access_token")))}`
axios.defaults.withCredentials = true  
axios.defaults.headers.common['Access-Control-Allow-Origin'] =  'http://localhost:3000';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

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
    url: `user/forgot`,
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
  console.log("user id in get user function in axsion", data.userId)
  return await axios({
    method: 'get',
    url: `/user/${data.userId}`
  })
}

export async function searchUsers(data: {contactList: any[], userId: string}): Promise<AxiosResponse<any>> {
  return await axios({
    method: 'post',
    url: `/user/search`,
    data: data
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