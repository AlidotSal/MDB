import { createResource } from "solid-js";

export default function MovieData() {

  let yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
  const dd = String(yesterday.getDate()).padStart(2, "0");
  const mm = String(yesterday.getMonth() + 1).padStart(2, "0");
  const yyyy = yesterday.getFullYear();

  yesterday = yyyy + "-" + mm + "-" + dd;

  const fetchNews = () => 
    fetch(
    `https://newsapi.org/v2/everything?q=movie OR film OR director OR hollywood&from=${yesterday}&apiKey=6f55e05d679b49ce9d686a1fae63135e`
  )
    .then((res) => res.json())
  

  const [data] = createResource(() => `news`, fetchNews);
  return data;
}