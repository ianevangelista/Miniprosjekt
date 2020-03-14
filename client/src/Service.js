// @flow
import axios from "axios";

export function getBreakingNews() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/");
}

export function getAllCategories() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/kategori");
}

export function getLiveFeedNews() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/sisteNyheter");
}

export function deleteNews(id: number | any) {
  return axios.delete(process.env.REACT_APP_BACKEND_URL + "/sak/" + id);
}

export function editNews(id: number, state: any) {
  return axios.put(process.env.REACT_APP_BACKEND_URL + "/sak/" + id, state);
}

export function searchNews(query: string) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/sok/" + query);
}

export function getArticleDetails(id: number) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/sak/" + id);
}

export function getCategory(id: number) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/kategori/" + id);
}

export function addNews(state: any) {
  return axios.post(process.env.REACT_APP_BACKEND_URL + "/registrerSak", state);
}

export function getComments(id: number | any) {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "/kommentar/" + id);
}

export function addComment(state: any) {
  return axios.post(
    process.env.REACT_APP_BACKEND_URL + "/registrerKommentar",
    state
  );
}

export function deleteComment(id: number | any) {
  return axios.delete(process.env.REACT_APP_BACKEND_URL + "/kommentar/" + id);
}

export function rateNews(id: number, state: any) {
  return axios.put(process.env.REACT_APP_BACKEND_URL + "/rating/" + id, state);
}

export function getRating(tommelOpp: number, tommelNed: number) {
  var totalVotes: number = tommelOpp + tommelNed;
  if (totalVotes === 0) return null;
  else {
    return ((tommelOpp - tommelNed) / totalVotes).toFixed(2);
  }
}

export function stringifyDate(date: string) {
  return date.slice(0, 10);
}

export function stringifyTime(date: string) {
  return date.slice(11, 16);
}
