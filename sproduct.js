console.log(localStorage.getItem("index"), "aaa");

function fetchProductData() {
  const id = JSON.parse(localStorage.getItem("index")) + 1;
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const parent = document.querySelector("#prodetails");
      var html = `
        <div class="single-pro-image"> 
        <img src=${data.image} width="100%" id="MainImg" alt="">
      </div>
    
      <div class="single-pro-details">
          <h6>${data.category}</h6>
          <h4>${data.title}</h4>
          <h2>$${data.price}</h2>
          <select>
              <option>Select Size</option>
              <option>XL</option>
              <option>XXL</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
          </select>
          <input type="number" value="1">
          <button class="normal" id="addtocart">Add to Cart</button>
          <h4>Product Details</h4>
          <span>${data.description} </span>
      </div>`;
      parent.innerHTML = html;
      const addedbtn = document.querySelector('.added')
      const addtocart = document.querySelector('#addtocart');
      addtocart.addEventListener('click',()=>{
        addedbtn.style.top = '10%'
        setTimeout(() => {
            addedbtn.style.top = '0%'
        }, 2000);
          const arr = JSON.parse(localStorage.getItem('addtocartArr'));
          if(!arr){
              localStorage.setItem('addtocartArr',JSON.stringify([id]))
          }else{
              arr.push(id);
              const uniqueArr = Array.from(new Set(arr));
              localStorage.setItem('addtocartArr',JSON.stringify(uniqueArr))
          }
      })
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}

function fetchFeaturedProductData() {
  fetch("https://fakestoreapi.com/products?limit=6")
    .then((response) => response.json())
    .then((data) => {
      const parent = document.querySelector(".pro-container");
      console.log(data);
      var html = "";
      data.forEach((element) => {
        html += `
            <div class="pro">
            <img src=${element.image} alt="" />
            <div class="des">
              <span>${element.category}</span>
              <h5>${element.title}</h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h4>${element.price}</h4>
            </div>
            <a href="#"><i class="fa fa-shopping-cart cart"></i></a>
          </div>`;
      });
      parent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}

fetchProductData();
fetchFeaturedProductData();
