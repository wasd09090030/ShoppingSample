
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const carousel = document.getElementById('carousel');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

showSlide(currentSlide);
startAutoSlide();

// --- Navigation Menu Toggle ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) { // Check if elements exist
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// registrationform 校验
document.getElementById("registrationform").addEventListener("submit", function(event) {
    let valid = true;

    // Date of Visit
    const visitDate = document.getElementById("date-of-visit");
    const visitDateError = document.getElementById("visitDateError");
    if (!visitDate.value) {
        visitDateError.textContent = "Select your visit date.";
        valid = false;
    } else {
        visitDateError.textContent = "";
    }

    // Number of Visitors
    const visitors = document.getElementById("no-of-visitors");
    const visitorsError = document.getElementById("visitorsError");
    if (!visitors.value) {
        visitorsError.textContent = "Select the number of visitors.";
        valid = false;
    } else {
        visitorsError.textContent = "";
    }

    // Full Name
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (!name.value.trim()) {
        nameError.textContent = "Name is required.";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    // Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    // Simple email regex for validation
    const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter a valid email.";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    // Date of Birth
    const dob = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    if (!dob.value) {
        dobError.textContent = "Select your birth date.";
        valid = false;
    } else {
        dobError.textContent = "";
    }

    // Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderError = document.getElementById("genderError");
    if (!gender) {
        genderError.textContent = "Please select your gender.";
        valid = false;
    } else {
        genderError.textContent = "";
    }

    // Ticket Type
    const ticket = document.getElementById("ticket");
    const ticketError = document.getElementById("ticketError");
    if (!ticket.value) {
        ticketError.textContent = "Choose a ticket type.";
        valid = false;
    } else {
        ticketError.textContent = "";
    }

    if (valid) {
        event.preventDefault();
    }
});



//shopping 


let cart = [];
let products = []; 

fetch("ghibli_merchandise.json")
.then(response => response.json())
.then(jsArrayOfObjects => {
  products = jsArrayOfObjects; 
  displayProducts(products);
})

function displayProducts(someArray){
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; 

  someArray.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-card";
    productDiv.innerHTML = `
      <img src="assets/${product.id}.jpg" alt="${product.name}" width="150">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productContainer.appendChild(productDiv);
  });

  //add to cart function
  document.querySelectorAll('.add-to-cart').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      addToCart(id);
      showSection('checkout');
    });
  });
}

// search function 
document.getElementById("search").addEventListener("input", function() {
  const searchString = this.value.trim().toLowerCase();
  const searchResults = products.filter(product => product.name.toLowerCase().includes(searchString));
  displayProducts(searchResults);
});

//My cart
function updateCart(){
  const listOfProducts = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  if (listOfProducts) {
      listOfProducts.innerHTML = cart.map(i => `<li>${i.name} - $${i.price}</li>`).join("");
  }
  if (totalPrice) {
      totalPrice.textContent = "Total Price: $" + total;
  }
}

function addToCart(id) {
  // add product to cart base on id
  const product = products.find(p => p.id == id);
  if (product) {
    cart.push(product);
    updateCart();
    showSection('checkout');
  }
}

// hide and show section
function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
  }
}

function hideSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add('hidden');
  }
}

//checkout button click event
document.getElementById('checkout').addEventListener('click', showCartView);


// show the showCartView function
function showCartView() {
  hideSection('checkout');
  showSection('cart-view');
  hideSection('product-container');
}

document.getElementById('Confirm').addEventListener('click', function() {
  showSection('bill-view');
  hideSection('cart-view');
});

// billform check value
document.getElementById("billform").addEventListener("submit", function(event) {
  let valid = true;

  
  const billName = document.getElementById("bill-name");
  const billNameError = document.getElementById("billNameError");
  if (!billName.value.trim()) {
      billNameError.textContent = "Enter your name please";
      valid = false;
  } else {
      billNameError.textContent = "";
  }

  // address
  const billAddress = document.getElementById("bill-address");
  const billAddressError = document.getElementById("billAddressError");
  if (!billAddress.value.trim()) {
      billAddressError.textContent = "Enter your address please";
      valid = false;
  } else {
      billAddressError.textContent = "";
  }

  // email
  const billEmail = document.getElementById("bill-email");
  const billEmailError = document.getElementById("billEmailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!billEmail.value.trim() || !emailPattern.test(billEmail.value.trim())) {
      billEmailError.textContent = "Please enter a valid email. ";
      valid = false;
  } else {
      billEmailError.textContent = "";
  }

//payment method
  const billPayment = document.getElementById("bill-payment");
  const billPaymentError = document.getElementById("billPaymentError");
  if (!billPayment.value) {
      billPaymentError.textContent = "please select a payment method";
      valid = false;
  } else {
      billPaymentError.textContent = "";
  }


  const billCard = document.getElementById("bill-card");
  const billCardError = document.getElementById("billCardError");

  //9-16 number
  const cardPattern = /^\d{9,16}$/;
  if (!billCard.value.trim() || !cardPattern.test(billCard.value.replace(/\s/g, ""))) {
      billCardError.textContent = "please enter a valid card number";
      valid = false;
  } else {
      billCardError.textContent = "";
  }

  // CVV
  const billCVV = document.getElementById("bill-cvv");
  const billCVVError = document.getElementById("billCVVError");
  // 3-4 number
  const cvvPattern = /^\d{3,4}$/;
  if (!billCVV.value.trim() || !cvvPattern.test(billCVV.value.trim())) {
      billCVVError.textContent = "please enter a valid CVV";
      valid = false;
  } else {
      billCVVError.textContent = "";
  }

  if (!valid) {
      event.preventDefault();
      return;
  }

  //stop refresh page
  event.preventDefault();

  // jump to success-view
  showSuccessView(billName.value, billAddress.value);
});





function showSuccessView(userName, userAddress) {
  hideSection('bill-view');
  showSection('success-view');
  // calculate total price
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  document.getElementById('success-text').innerHTML =
    `Thank you, ${userName}，<br>You have bought items totaling $${total}.<br>They will be delivered to<br>${userAddress}<br>in 3~4 days.`;

  // clear cart
  cart = [];
  updateCart();

  document.getElementById('backToShoppingBtn').addEventListener('click', function() {
    hideSection('success-view');
    showSection('product-container');
    hideSection('checkout');
  });
}


