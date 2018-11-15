import 'babel-polyfill';
import {getDataFromServer} from "./server-fetch";
import {createImages} from "./add-images";

async function pageRender(page) {
  const API_KEY = '935ae0186dbace947f1a0fdf7d92b27c';
  const searchingWord = document.querySelector("#keyword").value;
  const showMore = document.querySelector("#showMore");
  const picturesAmount = 10;
  const baseUrlForSearch = 'https://api.flickr.com/services/rest/?sort=relevance&parse_tags=1&content_type=7&lang=en-US&method=flickr.photos.search&format=json&nojsoncallback=1&hermes=1&hermesClient=1&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z';
  const url = `${baseUrlForSearch}&api_key=${API_KEY}&text=${searchingWord}&page=${page}&per_page=${picturesAmount}`;
  const {data} = await getDataFromServer(url, picturesAmount, searchingWord);

  let links = [];
  if (data.length) {
    document.querySelector(".error-message").textContent = '';
    data.forEach((photo) => {
      const {title, url_m} = photo;
      links.push({url: url_m, title});
    });
  } else {
    console.log('No hits');
    document.querySelector(".error-message").textContent = `Site https://www.flickr.com hasn't photos in category: ${searchingWord}`;
    showMore.classList.add("btn--hide")
  }

  createImages (links, page)

  if(links.length) {
    showMore.classList.remove("btn--hide");
  }
}

export {pageRender};