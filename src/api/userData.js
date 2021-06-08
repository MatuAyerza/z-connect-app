export async function loadUserData(number) {
    try {
      const baseUrl = "https://randomuser.me/api/?results="
      let response = await fetch(baseUrl.concat(number));
      let users = await response.json();
      let results = users.results
      return results
    } catch (error) {
      console.error(error);
    }
  }