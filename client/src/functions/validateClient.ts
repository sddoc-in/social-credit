import ClientInterface from "../interface/NewClient";
import setError from "./setError";

export default function validateClient(
  client: ClientInterface,
  Password?: string,
  checkPassword?: boolean
) {
  if (client.name === undefined || client.name === "") {
    return setError("First Name is required", "name");
  }
  if (client.name.length < 3) {
    return setError("First Name must be at least 3 characters", "name");
  }
  if (client.name.length > 20) {
    return setError("First Name must be less than 20 characters", "name");
  }
  if (client.username === undefined || client.username === "") {
    return setError("Username is required", "username");
  }
  if (client.username.length < 3) {
    return setError("Username must be at least 3 characters", "username");
  }
  if (client.username.length > 20) {
    return setError("Username must be less than 20 characters", "username");
  }
  if (client.lawyer === undefined || client.lawyer === "") {
    return setError("Role is required", "role");
  }
  if (client.email === undefined || client.email === "") {
    return setError("Email is required", "email");
  }
  if (!/\S+@\S+\.\S+/.test(client.email)) {
    return setError("Email address is invalid", "email");
  }
  if (checkPassword === true) {
    if (client.password === undefined || client.password === "") {
      return setError("Password is required", "password");
    }
    if (client.password.length < 8) {
      return setError("Password must be at least 8 characters", "password");
    }
    if (client.password.length > 20) {
      return setError("Password must be less than 20 characters", "password");
    }
    if (!/(?=.*[0-9])/.test(client.password)) {
      return setError("Password must contain a number", "password");
    }
    if (!/(?=.*[!@#$%^&*])/.test(client.password)) {
      return setError("Password must contain a special character", "password");
    }
    if (!/(?=.*[a-z])/.test(client.password)) {
      return setError("Password must contain a lowercase letter", "password");
    }
    if (!/(?=.*[A-Z])/.test(client.password)) {
      return setError("Password must contain an uppercase letter", "password");
    }
    if (!/(?=.*[a-zA-Z])/.test(client.password)) {
      return setError("Password must contain a letter", "password");
    }
  }

  return setError("", "", false);
}
