export async function loadHnStories() {
    const url = "http://localhost:3000/hn/topstories"
    const respons = await fetch(url);
    if(respons.status<200 || respons.status >=400){
        throw new Error(`HTTP request went rong: got "${respons.status}"`)
    }
    const json = respons.json();
    return json;
}

export async function loadHnStatuses() {
    const url = "http://localhost:3000/itemStatuses"
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(`HTTP Request went wrong: got "${response.statusText}" for "${url}"`)
    }
    const json = await response.json();
    return json;
}

export async function setStatus(id,status) {
    const url = "http://localhost:3000/itemStatuses/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'text/plain'
      },
      body: status,
    });
    if (response.status !== 200) {
      throw new Error(`HTTP PUT request went wrong: got "${response.statusText}" for "${url}"`)
    }
}