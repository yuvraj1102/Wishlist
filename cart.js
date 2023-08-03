console.log("cart");

function fetchProductData() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var addtocartArr = JSON.parse(localStorage.getItem('addtocartArr'));
      var html = ``;
      const parent = document.querySelector('#tbody');
      data.forEach((element,index) => {
          if(addtocartArr.includes(index+1)){
           html += `
           <tr data-id="${element.id}">
                 <td class="remove-cart-btn"> <i class="far fa-times-circle"></i></td>
                 <td><img src=${element.image} alt=""></td>
                 <td>${element.category}</td>
                 <td>$${element.price}9</td>
                 <td><input type="number" value="1"></td>
                 <td>$118.19</td>
             </tr>
           `
       }
      });
      parent.innerHTML = html

      const removeBtn = document.querySelectorAll('.remove-cart-btn')
      removeBtn.forEach((item)=>{
          item.addEventListener('click',(e)=>{
              const trElement = e.target.parentElement
              const id = trElement.getAttribute('data-id');
              addtocartArr = addtocartArr.filter((element)=>element!=id)
              localStorage.setItem('addtocartArr',JSON.stringify(addtocartArr));
              fetchProductData()
              const removebtn = document.querySelector('.remove')
              removebtn.style.top = '10%'
              setTimeout(() => {
                  removebtn.style.top = '0%'
              }, 2000);
          })
      })
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}

fetchProductData();
