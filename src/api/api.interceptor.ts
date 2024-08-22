import axios from 'axios'
import { getContentType } from './api.helper'

export const baseUrl = process.env.SERVER_URL

const axiosOptions = {
	baseURL: baseUrl,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)
