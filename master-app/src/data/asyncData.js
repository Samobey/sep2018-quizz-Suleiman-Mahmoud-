export async function loadCatagories() {
    const url = "http://localhost:4000/catagories"
    const respons = await fetch(url);
    if(respons.status<200 || respons.status >=400){
        throw new Error(`HTTP request went rong: got "${respons.status}"`)
    }
    const json = respons.json();
    return json;
}

export async function loadQuistions(catId) {
  const url = `http://localhost:4000/quistions/${catId}`
  const respons = await fetch(url);
  if(respons.status<200 || respons.status >=400){
      throw new Error(`HTTP request went rong: got "${respons.status}"`)
  }
  const json = respons.json();
  return json;
}