import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL="http://localhost:3000"

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

export async function sendMessage(data: {
    sender: string;
    text: string;
    chatId: string
}): Promise<AxiosResponse<any>> {
    return await axios({
        method: 'post',
        url: 'messages',
        data: data
    })
}


