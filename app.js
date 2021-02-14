const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBox = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const spinner = document.getElementById("spinner");

const getImages = (query) => {
  toggleSpinner();
  document.getElementById('duration').value="";
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
// selected image 
let sliders = [];
// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail img-height" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
  });
  toggleSpinner();
  searchBox.value="";
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } 
  else {
    sliders.splice(item, 1);
  }
}
var timer
const createSlider = () => {
  const duration = document.getElementById('duration').value || 1000;
  let removeNegativeValue=Math.abs(duration);
    if(removeNegativeValue<600){
      removeNegativeValue = removeNegativeValue + 1000;
    }
    if(removeNegativeValue>0){
    // check slider image length
    if (sliders.length < 2) {
      alert('Select at least 2 image.')
      return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
    <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    sliders.forEach(slide => {
      let item = document.createElement('div');
      let sliderTitle=document.createElement("div");
      item.className = "slider-item";
      sliderTitle.className="slider-title";
      sliderTitle.innerHTML=`
      <a href='index.html'><button>Back to home page</button></a>
      `;
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      item.appendChild(sliderTitle);
      sliderContainer.appendChild(item);
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, removeNegativeValue);
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}
//  Enter Action code
searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
      searchBtn.click();
    }
}); 

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  getImages(searchBox.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})
// Spinner Add
const toggleSpinner = ()=>{
  spinner.classList.toggle("d-none");
}