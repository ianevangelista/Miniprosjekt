// @flow
import axios from "axios";

export function getBreakingNews() {
  return axios.get("http://localhost:8000/");
}

export function getAllCategories() {
  return axios.get("http://localhost:8000/kategori");
}

export function getLiveFeedNews() {
  return axios.get("http://localhost:8000/sisteNyheter");
}

export function deleteNews(id: number | any) {
  return axios.delete("http://localhost:8000/sak/" + id);
}

export function editNews(id: number, state: any) {
  return axios.put("http://localhost:8000/sak/" + id, state);
}

export function searchNews(query: string) {
  return axios.get("http://localhost:8000/sok/" + query);
}

export function getArticleDetails(id: number) {
  return axios.get("http://localhost:8000/sak/" + id);
}

export function getCategory(id: number) {
  return axios.get("http://localhost:8000/kategori/" + id);
}

export function addNews(state: any) {
  return axios.post("http://localhost:8000/registrerSak", state);
}

export function getComments(id: number | any) {
  return axios.get("http://localhost:8000/kommentar/" + id);
}

export function addComment(state: any) {
  return axios.post("http://localhost:8000/registrerKommentar", state);
}

export function deleteComment(id: number | any) {
  return axios.delete("http://localhost:8000/kommentar/" + id);
}

export function rateNews(id: number, state: any) {
  return axios.put("http://localhost:8000/rating/" + id, state);
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
