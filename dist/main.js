const introCards = Array.from(document.querySelectorAll("[data-carousel-item]"));
const timelineOverlay = document.querySelector(".timeline-overlay");
const footerInfo = {
  businessEmail: "info@jinghua.security",
  mediaEmail: "pr@jinghua.security",
  phone: "15611715032",
};

const footerBusinessEmail = document.querySelector("#footer-business-email");
const footerMediaEmail = document.querySelector("#footer-media-email");
const footerPhone = document.querySelector("#footer-phone");

if (footerBusinessEmail) {
  footerBusinessEmail.textContent = footerInfo.businessEmail;
}

if (footerMediaEmail) {
  footerMediaEmail.textContent = footerInfo.mediaEmail;
}

if (footerPhone) {
  footerPhone.textContent = footerInfo.phone;
}

if (timelineOverlay) {
  window.setInterval(() => {
    timelineOverlay.classList.toggle("is-visible");
  }, 5000);
}

if (introCards.length) {
  let activeIndex = 0;
  let timerId = null;

  const setActiveCard = (index) => {
    activeIndex = index;
    introCards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });
  };

  const startCarousel = () => {
    if (timerId) window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % introCards.length;
      setActiveCard(nextIndex);
    }, 2000);
  };

  introCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      setActiveCard(index);
      startCarousel();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveCard(index);
        startCarousel();
      }
    });
  });

  setActiveCard(0);
  startCarousel();
}
