import axios from "axios";
import {QueryClient} from "@tanstack/react-query";

export const apiClient = axios.create({
    baseURL: "http://192.168.1.131:8000",
    withCredentials: true
})

export const queryClient = new QueryClient()