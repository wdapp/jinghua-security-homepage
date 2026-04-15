const formalFooterInfo = {
  businessEmail: "info@jinghua.security",
  mediaEmail: "pr@jinghua.security",
  phone: "15611715032",
};

const formalBusinessEmail = document.querySelector("#home-business-email");
const formalMediaEmail = document.querySelector("#home-media-email");
const formalPhone = document.querySelector("#home-phone");
const homeOverviewCards = Array.from(document.querySelectorAll("[data-home-overview-item]"));
const homeSolutionCards = Array.from(document.querySelectorAll("[data-home-carousel-item]"));
const homeTimelineItems = Array.from(document.querySelectorAll("[data-home-timeline-item]"));
const qrTriggers = Array.from(document.querySelectorAll("[data-home-qr-trigger]"));
const qrPanels = Array.from(document.querySelectorAll("[data-home-qr-panel]"));

if (formalBusinessEmail) {
  formalBusinessEmail.textContent = formalFooterInfo.businessEmail;
}

if (formalMediaEmail) {
  formalMediaEmail.textContent = formalFooterInfo.mediaEmail;
}

if (formalPhone) {
  formalPhone.textContent = formalFooterInfo.phone;
}

const mountAutoCarousel = (items, activeClass, intervalMs) => {
  if (!items.length) return;

  let activeIndex = 0;
  let timerId = null;

  const setActive = (index) => {
    activeIndex = index;
    items.forEach((item, itemIndex) => {
      item.classList.toggle(activeClass, itemIndex === index);
    });
  };

  const restart = () => {
    if (timerId) {
      window.clearInterval(timerId);
    }

    timerId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      setActive(nextIndex);
    }, intervalMs);
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      setActive(index);
      restart();
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActive(index);
        restart();
      }
    });
  });

  setActive(0);
  restart();
};

mountAutoCarousel(homeSolutionCards, "is-active", 5000);
mountAutoCarousel(homeTimelineItems, "is-active", 5000);
mountAutoCarousel(homeOverviewCards, "is-active", 5000);

const closeQrPanels = (exceptName = "") => {
  qrPanels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.dataset.homeQrPanel === exceptName && exceptName !== "");
  });
};

qrTriggers.forEach((trigger) => {
  const panelName = trigger.dataset.homeQrTrigger;

  trigger.addEventListener("mouseenter", () => {
    closeQrPanels(panelName);
  });

  trigger.addEventListener("focus", () => {
    closeQrPanels(panelName);
  });

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const targetPanel = qrPanels.find((panel) => panel.dataset.homeQrPanel === panelName);
    const shouldOpen = targetPanel ? !targetPanel.classList.contains("is-visible") : false;
    closeQrPanels(shouldOpen ? panelName : "");
  });

  const wrapper = trigger.closest(".formal-social-has-qr");
  if (wrapper) {
    wrapper.addEventListener("mouseleave", () => {
      closeQrPanels("");
    });
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element) || !target.closest(".formal-social-has-qr")) {
    closeQrPanels("");
  }
});
