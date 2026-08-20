/* =========================================================
   DARK WEBSITE - script.js
   Digital Entertainment & Gaming Store
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });
  }


  /* =========================
     SEARCH
  ========================= */

  const searchBtn = document.querySelector(".search-btn");
  const searchBox = document.querySelector(".search-box");
  const searchInput = document.querySelector("#searchInput");

  if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", () => {
      searchBox.classList.toggle("active");

      if (searchBox.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const products = document.querySelectorAll(".product-card");

      products.forEach(product => {
        const text = product.textContent.toLowerCase();

        product.style.display =
          text.includes(searchTerm) ? "" : "none";
      });
    });
  }


  /* =========================
     CART
  ========================= */

  let cart = JSON.parse(localStorage.getItem("darkCart")) || [];

  const cartCount = document.querySelector(".cart-count");

  function updateCartCount() {
    if (!cartCount) return;

    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    cartCount.textContent = totalItems;
  }

  function saveCart() {
    localStorage.setItem("darkCart", JSON.stringify(cart));
    updateCartCount();
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

      const productCard = button.closest(".product-card");

      if (!productCard) return;

      const name =
        productCard.dataset.name ||
        productCard.querySelector(".product-name")?.textContent ||
        "DARK Product";

      const price =
        parseFloat(productCard.dataset.price) ||
        parseFloat(
          productCard.querySelector(".price")?.textContent
            .replace(/[^0-9.]/g, "")
        ) ||
        0;

      const existingProduct =
        cart.find(item => item.name === name);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      saveCart();

      button.textContent = "Added ✓";

      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1500);

    });

  });

  updateCartCount();


  /* =========================
     PLAN SELECTION
  ========================= */

  document.querySelectorAll(".plan-btn").forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".plan-btn")
        .forEach(btn => btn.classList.remove("selected"));

      button.classList.add("selected");

      const plan = button.dataset.plan;

      if (plan) {
        console.log("Selected plan:", plan);
      }

    });

  });


  /* =========================
     PRODUCT FILTERS
  ========================= */

  const filterButtons =
    document.querySelectorAll("[data-category]");

  const productCards =
    document.querySelectorAll(".product-card");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const category = button.dataset.category;

      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      productCards.forEach(card => {

        const cardCategory =
          card.dataset.category;

        if (
          category === "all" ||
          cardCategory === category
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });


  /* =========================
     FAQ
  ========================= */

  document.querySelectorAll(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

      const answer =
        question.nextElementSibling;

      question.classList.toggle("active");

      if (answer) {
        answer.classList.toggle("active");
      }

    });

  });


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* =========================
     AI CHATBOT
  ========================= */

  const chatButton =
    document.querySelector("#aiChatButton");

  const chatWindow =
    document.querySelector("#aiChatWindow");

  const chatClose =
    document.querySelector("#aiChatClose");

  const chatInput =
    document.querySelector("#aiChatInput");

  const chatSend =
    document.querySelector("#aiChatSend");

  const chatMessages =
    document.querySelector("#aiChatMessages");


  function openChat() {
    if (chatWindow) {
      chatWindow.classList.add("active");
    }

    if (chatInput) {
      setTimeout(() => chatInput.focus(), 200);
    }
  }


  function closeChat() {
    if (chatWindow) {
      chatWindow.classList.remove("active");
    }
  }


  if (chatButton) {
    chatButton.addEventListener("click", openChat);
  }

  if (chatClose) {
    chatClose.addEventListener("click", closeChat);
  }


  function addMessage(message, sender) {

    if (!chatMessages) return;

    const messageElement =
      document.createElement("div");

    messageElement.className =
      `chat-message ${sender}`;

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop =
      chatMessages.scrollHeight;
  }


  function getDARKResponse(message) {

    const text = message.toLowerCase();


    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hey 👋 Welcome to DARK! How can I help you today?";
    }


    if (
      text.includes("price") ||
      text.includes("cost")
    ) {
      return "I can help you find our current prices. Check the Movies & TV, Gaming, Gift Cards, or Deals sections.";
    }


    if (
      text.includes("movie") ||
      text.includes("tv") ||
      text.includes("stream")
    ) {
      return "You can check our Movies & TV section for the available plans and options.";
    }


    if (
      text.includes("gaming") ||
      text.includes("game") ||
      text.includes("top up") ||
      text.includes("topup")
    ) {
      return "🎮 DARK offers gaming products and top-ups. Check the Gaming section for available options.";
    }


    if (
      text.includes("gift card") ||
      text.includes("giftcard")
    ) {
      return "🎁 Check our Gift Cards section to see the available cards and prices.";
    }


    if (
      text.includes("deal") ||
      text.includes("discount")
    ) {
      return "🔥 Check the Deals section for our latest offers.";
    }


    if (
      text.includes("contact") ||
      text.includes("support") ||
      text.includes("help")
    ) {
      return "Our support team can help you with orders, products, payments, and account questions.";
    }


    if (
      text.includes("order") ||
      text.includes("buy") ||
      text.includes("purchase")
    ) {
      return "You can select a product, add it to your cart, and continue to checkout.";
    }


    return "I'm DARK AI 🤖. I can help you with products, prices, gaming, Movies & TV, gift cards, deals, orders, and support.";
  }


  async function sendMessage() {

    if (!chatInput) return;

    const message =
      chatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";

    // Temporary local response.
    // Replace this section with your real AI API
    // when your backend is connected.

    setTimeout(() => {

      const response =
        getDARKResponse(message);

      addMessage(response, "bot");

    }, 500);

  }


  if (chatSend) {
    chatSend.addEventListener(
      "click",
      sendMessage
    );
  }


  if (chatInput) {

    chatInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }

      }
    );

  }


  /* =========================
     NEWSLETTER
  ========================= */

  const newsletterForm =
    document.querySelector("#newsletterForm");

  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const email =
          newsletterForm.querySelector(
            "input[type='email']"
          )?.value;

        if (!email) return;

        alert(
          "Thanks for subscribing to DARK! 🔥"
        );

        newsletterForm.reset();

      }
    );

  }


  /* =========================
     CONTACT FORM
  ========================= */

  const contactForm =
    document.querySelector("#contactForm");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        alert(
          "Your message has been received. DARK support will get back to you."
        );

        contactForm.reset();

      }
    );

  }


  /* =========================
     SCROLL EFFECT
  ========================= */

  const header =
    document.querySelector("header");

  window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  });


  /* =========================
     BACK TO TOP
  ========================= */

  const backToTop =
    document.querySelector("#backToTop");

  if (backToTop) {

    window.addEventListener("scroll", () => {

      backToTop.classList.toggle(
        "visible",
        window.scrollY > 400
      );

    });

    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  console.log(
    "DARK website JavaScript loaded successfully ⚡"
  );

});
