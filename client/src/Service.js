import axios from "axios";

export function getBreakingNews() {
  return axios.get("http://localhost:8000/").then(response => {
    console.log(response);
    return response.data;
  });
}

export function getAllCategories() {
  return axios.get("http://localhost:8000/kategori").then(response => {
    console.log(response);
    return response.data;
  });
}

export function getLiveFeedNews() {
  return axios.get("http://localhost:8000/sisteNyheter").then(response => {
    console.log(response);
    return response.data;
  });
}

export function deleteNews(id) {
  console.log(id);
  return axios.delete("http://localhost:8000/sak/" + id).then(response => {
    console.log(response);
  });
}

export function editNews(id, state) {
  return axios.put("http://localhost:8000/sak/" + id, state).then(response => {
    console.log(response);
    return response.data;
  });
}

export function searchNews(query) {
  return axios.get("http://localhost:8000/sok/" + query);
}

export function getArticleDetails(id) {
  return axios.get("http://localhost:8000/sak/" + id).then(response => {
    console.log(response);
    return response;
  });
}

export function getCategory(id) {
  return axios.get("http://localhost:8000/kategori/" + id).then(response => {
    console.log(response);
    return response;
  });
}

export function addNews(state) {
  return axios
    .post("http://localhost:8000/registrerSak", state)
    .then(response => {
      console.log(response);
      return response.data;
    });
}

export function getComments(id) {
  return axios.get("http://localhost:8000/kommentar/" + id).then(response => {
    console.log(response);
    return response;
  });
}

export function addComment(state) {
  return axios
    .post("http://localhost:8000/registrerKommentar", state)
    .then(response => {
      console.log(response);
      return response.data;
    });
}

export function deleteComment(id) {
  return axios
    .delete("http://localhost:8000/kommentar/" + id)
    .then(response => {
      console.log(response);
    });
}

export function rateNews(id, state) {
  return axios
    .put("http://localhost:8000/rating/" + id, state)
    .then(response => {
      console.log(response);
      return response.data;
    });
}

export function getRating(tommelOpp, tommelNed) {
  var totalVotes = tommelOpp + tommelNed;
  if (totalVotes == 0) return null;
  else {
    return ((tommelOpp - tommelNed) / totalVotes).toFixed(2);
  }
}

export function stringifyDate(date: String) {
  return date.slice(0, 10);
}

export function stringifyTime(date: String) {
  return date.slice(11, 16);
}
