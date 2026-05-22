export function getStoredUser() {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("authchange"));
}

export function clearStoredAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("authchange"));
}

export function getStoredToken() {
  return localStorage.getItem("token");
}

export function getUserDisplayName(user) {
  if (!user) {
    return "Account";
  }

  const nameSource = user.fullName || user.username || user.name || user.email || "";
  const trimmedName = nameSource.trim();

  if (!trimmedName) {
    return "Account";
  }

  if (trimmedName.includes("@")) {
    const [localPart] = trimmedName.split("@");
    return formatUserName(localPart);
  }

  return formatUserName(trimmedName);
}

function formatUserName(value) {
  return value
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const payload = parseJwtPayload(token);

  if (!payload) {
    clearStoredAuth();
    return false;
  }

  if (payload.exp && Date.now() >= payload.exp * 1000) {
    clearStoredAuth();
    return false;
  }

  return true;
}

function parseJwtPayload(token) {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = atob(normalized);
    return JSON.parse(decodedPayload);
  } catch (error) {
    return null;
  }
}
