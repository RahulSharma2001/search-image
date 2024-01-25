const sv = document.getElementById("search-val");
const btn = document.querySelector(".search");
const cont = document.getElementById("container");
let page = 1;

const key = "mYGgNUUkwjCGwslQBCMEkZRbcO4yxslDyTrC-Y4m8uI";

async function showImages() {
  if (page == 1) {
    cont.innerHTML = "";
  }
  /*fetch images and append*/
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${sv.value}&client_id=${key}`;
  let res = await fetch(url);
  let jasonResponse = await res.json();
  let imageArray = jasonResponse.results;
  imageArray.map((image) => {
    let imageDiv = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", image.urls.small);
    img.setAttribute("width", "300px");
    img.setAttribute("height", "300px");
    imageDiv.append(img);

    let text = document.createElement("div");
    text.innerText = image.alt_description.toUpperCase();
    text.style.fontWeight = 500;
    text.classList.add("desc");
    imageDiv.append(text);
    cont.append(imageDiv);
  });
  /*ends*/

  /*create more button only once and add eventListner*/
  if (page == 1) {
    let moreDiv = document.createElement("button");
    moreDiv.innerText = "SEE MORE";
    moreDiv.classList.add("more");
    moreDiv.addEventListener("click", () => {
      page++;
      showImages();
    });
    cont.after(moreDiv);
  }
  /*ends*/
}

btn.addEventListener("click", () => {
  if (sv.value != "") showImages();
});
