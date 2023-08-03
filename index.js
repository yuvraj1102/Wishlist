const bar = document.getElementById("bar");
const product1 = document.getElementById("product1");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");


bar.addEventListener("click", () => {
  nav.classList.add("active");
});

close.addEventListener("click", () => {
  nav.classList.remove("active");
});


// fetching products from api
function fetchProductData() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var html = ``
      data.forEach(element => {
        html+=`
        <div class="pro">
        <img src=${element.image} alt="" />
        <div class="des">
          <span>${element.category}</span>
          <h5>${element.description.slice(0,15)}...</h5>
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
      </div>`
      });
      document.querySelector('.pro-container').innerHTML = html

      const proArr = document.querySelectorAll('.pro')
     

      proArr.forEach((item,index)=>{
        item.addEventListener('click',(e)=>{
          console.log(index);
          window.location.href='sproduct.html'
          localStorage.setItem('index',index)
        })
      })
      
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
}

fetchProductData()


