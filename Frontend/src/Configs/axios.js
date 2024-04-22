import axios from "axios";
import { Constants } from "../Constants";

export const instance = axios.create({
  baseURL: Constants.BasedUrl,
  headers: {
    Authorization: Constants.AuthorizationToken
  }
});
