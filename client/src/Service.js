import axios from "axios";

export function getBreakingNews() {
  return axios.get("http://localhost:8000/").then(response => {
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
