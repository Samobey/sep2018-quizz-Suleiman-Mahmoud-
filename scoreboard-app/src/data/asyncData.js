export async function loadTeams() {
    const url = "http://localhost:4000/teams"
    const respons = await fetch(url);
    if(respons.status<200 || respons.status >=400){
        throw new Error(`HTTP request went rong: got "${respons.status}"`)
    }
    const json = respons.json();
    return json;
}

export async function loadquestion(quistionsnumber,quizzerId) {
    // console.log(quizzerId);
  const url = 'http://localhost:4000/question/'+quizzerId+'/'+quistionsnumber
  const respons = await fetch(url);
  if(respons.status<200 || respons.status >=400){
      throw new Error(`HTTP request went rong: got "${respons.status}"`)
  }
  const json = respons.json();
  return json;
}

export async function loadResults(id) {
    console.log('id',id);
    const url = `http://localhost:4000/getResults/${id}`
    const respons = await fetch(url);
    if(respons.status<200 || respons.status >=400){
        throw new Error(`HTTP request went rong: got "${respons.status}"`)
    }
    const json = respons.json();
    return json;
  }
 