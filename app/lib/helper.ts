
export function getCookieValue(name: string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
}