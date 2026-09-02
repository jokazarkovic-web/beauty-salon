document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     LOADING SCREEN
  ====================================== */

  const luxuryLoader =
    document.getElementById(
      "luxuryLoader"
    );


  document.body.classList.add(
    "loading"
  );


  function hideLoader() {

    if (!luxuryLoader) {
      return;
    }


    luxuryLoader.classList.add(
      "hide"
    );


    document.body.classList.remove(
      "loading"
    );

  }


  window.addEventListener(
    "load",
    () => {

      setTimeout(
        hideLoader,
        700
      );

    }
  );


  setTimeout(
    hideLoader,
    2600
  );


  /* =====================================
     HERO VIDEO
  ====================================== */

  const heroVideo =
    document.getElementById(
      "heroVideo"
    );


  if (heroVideo) {

    heroVideo.muted = true;


    const playPromise =
      heroVideo.play();


    if (
      playPromise !== undefined
    ) {

      playPromise.catch(() => {

        heroVideo.style.display =
          "none";

      });

    }

  }


  /* =====================================
     CUSTOM CURSOR
  ====================================== */

  const customCursor =
    document.getElementById(
      "customCursor"
    );

  const customCursorDot =
    document.getElementById(
      "customCursorDot"
    );


  const useCustomCursor =
    window.matchMedia(
      "(pointer: fine)"
    ).matches &&
    window.innerWidth > 900;


  if (
    customCursor &&
    customCursorDot &&
    useCustomCursor
  ) {

    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

        cursorX =
          event.clientX;

        cursorY =
          event.clientY;


        customCursorDot.style.left =
          `${cursorX}px`;

        customCursorDot.style.top =
          `${cursorY}px`;


        customCursor.classList.add(
          "visible"
        );

        customCursorDot.classList.add(
          "visible"
        );

      }
    );


    function animateCursor() {

      ringX +=
        (cursorX - ringX) *
        0.14;

      ringY +=
        (cursorY - ringY) *
        0.14;


      customCursor.style.left =
        `${ringX}px`;

      customCursor.style.top =
        `${ringY}px`;


      requestAnimationFrame(
        animateCursor
      );

    }


    animateCursor();


    document
      .querySelectorAll(
        "a, button, input, textarea, .gallery-item"
      )
      .forEach((element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            customCursor.classList.add(
              "hover"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            customCursor.classList.remove(
              "hover"
            );

          }
        );

      });

  }


  /* =====================================
     MAGNETIC BUTTONS
  ====================================== */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic"
    );


  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    magneticElements.forEach(
      (element) => {

        element.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              element
                .getBoundingClientRect();


            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;


            element.style.transform =
              `translate(${x * 0.1}px, ${y * 0.14}px)`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "translate(0, 0)";

          }
        );

      }
    );

  }


  /* =====================================
     MAIN ELEMENTS
  ====================================== */

  const menuToggle =
    document.getElementById(
      "menuToggle"
    );

  const mainNav =
    document.getElementById(
      "mainNav"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );

  const backToTop =
    document.getElementById(
      "backToTop"
    );

  const salonStatus =
    document.getElementById(
      "salonStatus"
    );

  const statusText =
    document.getElementById(
      "statusText"
    );

  const contactStatus =
    document.getElementById(
      "contactStatus"
    );


  /* =====================================
     BELGRADE OPEN STATUS
  ====================================== */

  function getBelgradeTime() {

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone:
            "Europe/Belgrade",

          weekday:
            "short",

          hour:
            "2-digit",

          minute:
            "2-digit",

          hour12:
            false
        }
      )
      .formatToParts(
        new Date()
      );


    const values = {};


    parts.forEach(
      (part) => {

        values[part.type] =
          part.value;

      }
    );


    return {
      weekday:
        values.weekday,

      hour:
        Number(values.hour),

      minute:
        Number(values.minute)
    };

  }


  function updateSalonStatus() {

    const time =
      getBelgradeTime();


    const days = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0
    };


    const day =
      days[time.weekday];

    const minutes =
      time.hour * 60 +
      time.minute;

    const openTime =
      9 * 60;

    const closeTime =
      20 * 60;


    const isOpen =
      day >= 1 &&
      day <= 6 &&
      minutes >= openTime &&
      minutes < closeTime;


    if (
      salonStatus &&
      statusText
    ) {

      salonStatus.classList.remove(
        "open",
        "closed"
      );


      if (isOpen) {

        salonStatus.classList.add(
          "open"
        );

        statusText.textContent =
          "OPEN NOW · UNTIL 20:00";

      } else {

        salonStatus.classList.add(
          "closed"
        );


        if (day === 0) {

          statusText.textContent =
            "CLOSED · OPENS MONDAY 09:00";

        } else if (
          minutes < openTime
        ) {

          statusText.textContent =
            "CLOSED · OPENS TODAY 09:00";

        } else if (
          day === 6
        ) {

          statusText.textContent =
            "CLOSED · OPENS MONDAY 09:00";

        } else {

          statusText.textContent =
            "CLOSED · OPENS TOMORROW 09:00";

        }

      }

    }


    if (contactStatus) {

      contactStatus.classList.remove(
        "open",
        "closed"
      );


      if (isOpen) {

        contactStatus.textContent =
          "● WE ARE OPEN NOW";

        contactStatus.classList.add(
          "open"
        );

      } else {

        contactStatus.textContent =
          "● WE ARE CURRENTLY CLOSED";

        contactStatus.classList.add(
          "closed"
        );

      }

    }

  }


  updateSalonStatus();


  setInterval(
    updateSalonStatus,
    60000
  );


  /* =====================================
     MOBILE MENU
  ====================================== */

  function closeMobileMenu() {

    if (
      !mainNav ||
      !menuToggle
    ) {
      return;
    }


    mainNav.classList.remove(
      "open"
    );

    menuToggle.classList.remove(
      "active"
    );

    document.body.classList.remove(
      "menu-open"
    );


    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (
    menuToggle &&
    mainNav
  ) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mainNav.classList.toggle(
            "open"
          );


        menuToggle.classList.toggle(
          "active",
          isOpen
        );


        document.body.classList.toggle(
          "menu-open",
          isOpen
        );


        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );

  }


  navLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    }
  );


  /* =====================================
     ACTIVE NAVIGATION
  ====================================== */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  function updateActiveNavigation() {

    let current =
      "home";


    sections.forEach(
      (section) => {

        const top =
          section.offsetTop -
          180;

        const height =
          section.offsetHeight;


        if (
          window.scrollY >= top &&
          window.scrollY <
          top + height
        ) {

          current =
            section.id;

        }

      }
    );


    navLinks.forEach(
      (link) => {

        link.classList.remove(
          "active"
        );


        if (
          link.getAttribute(
            "href"
          ) ===
          `#${current}`
        ) {

          link.classList.add(
            "active"
          );

        }

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );


  updateActiveNavigation();


  /* =====================================
     BACK TO TOP
  ====================================== */

  function updateBackToTop() {

    if (!backToTop) {
      return;
    }


    backToTop.classList.toggle(
      "show",
      window.scrollY > 700
    );

  }


  window.addEventListener(
    "scroll",
    updateBackToTop
  );


  if (backToTop) {

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


  /* =====================================
     SCROLL REVEAL
  ====================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.1
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =====================================
     BEFORE AFTER
  ====================================== */

  const comparisons =
    document.querySelectorAll(
      "[data-comparison]"
    );


  comparisons.forEach(
    (comparison) => {

      const range =
        comparison.querySelector(
          ".comparison-range"
        );

      const after =
        comparison.querySelector(
          "[data-after]"
        );

      const divider =
        comparison.querySelector(
          "[data-divider]"
        );


      if (
        !range ||
        !after ||
        !divider
      ) {
        return;
      }


      function updateComparison() {

        const value =
          range.value;


        after.style.width =
          `${value}%`;


        divider.style.left =
          `${value}%`;

      }


      range.addEventListener(
        "input",
        updateComparison
      );


      updateComparison();

    }
  );


  /* =====================================
     COUNTERS
  ====================================== */

  const counters =
    document.querySelectorAll(
      ".counter"
    );

  let countersStarted =
    false;


  function startCounters() {

    if (countersStarted) {
      return;
    }


    const statsSection =
      document.querySelector(
        ".stats-section"
      );


    if (!statsSection) {
      return;
    }


    const rect =
      statsSection
        .getBoundingClientRect();


    if (
      rect.top <
      window.innerHeight *
      0.85
    ) {

      countersStarted =
        true;


      counters.forEach(
        (counter) => {

          const target =
            Number(
              counter.dataset.target
            );

          const decimal =
            counter.dataset.decimal ===
            "true";

          const duration =
            1400;

          const start =
            performance.now();


          function animate(now) {

            const progress =
              Math.min(
                (
                  now - start
                ) /
                duration,
                1
              );


            const value =
              target *
              progress;


            if (decimal) {

              counter.textContent =
                (
                  value /
                  10
                ).toFixed(1);

            } else {

              counter.textContent =
                Math
                  .floor(value)
                  .toLocaleString();

            }


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                animate
              );

            }

          }


          requestAnimationFrame(
            animate
          );

        }
      );

    }

  }


  window.addEventListener(
    "scroll",
    startCounters
  );


  startCounters();


  /* =====================================
     LIGHTBOX
  ====================================== */

  const lightbox =
    document.getElementById(
      "lightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxCaption =
    document.getElementById(
      "lightboxCaption"
    );

  const lightboxClose =
    document.getElementById(
      "lightboxClose"
    );


  function openLightbox(
    source,
    alt,
    caption
  ) {

    if (
      !lightbox ||
      !lightboxImage
    ) {
      return;
    }


    lightboxImage.src =
      source;

    lightboxImage.alt =
      alt;


    if (lightboxCaption) {

      lightboxCaption.textContent =
        caption || alt;

    }


    lightbox.classList.add(
      "show"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "lightbox-open"
    );

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }


    lightbox.classList.remove(
      "show"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "lightbox-open"
    );

  }


  document
    .querySelectorAll(
      ".gallery-item"
    )
    .forEach(
      (item) => {

        item.addEventListener(
          "click",
          () => {

            const image =
              item.querySelector(
                "img"
              );

            const caption =
              item.querySelector(
                ".gallery-overlay span"
              );


            if (!image) {
              return;
            }


            openLightbox(
              image.src,
              image.alt,
              caption
                ? caption.textContent
                : image.alt
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".instagram-card"
    )
    .forEach(
      (item) => {

        item.addEventListener(
          "click",
          () => {

            const image =
              item.querySelector(
                "img"
              );


            if (!image) {
              return;
            }


            openLightbox(
              image.src,
              image.alt,
              "LUMIÈRE BEAUTY JOURNAL"
            );

          }
        );

      }
    );


  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  /* =====================================
     FAQ
  ====================================== */

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(
    (item) => {

      const question =
        item.querySelector(
          ".faq-question"
        );

      const answer =
        item.querySelector(
          ".faq-answer"
        );


      if (
        !question ||
        !answer
      ) {
        return;
      }


      question.addEventListener(
        "click",
        () => {

          const isOpen =
            item.classList.contains(
              "open"
            );


          faqItems.forEach(
            (otherItem) => {

              otherItem.classList.remove(
                "open"
              );


              const otherAnswer =
                otherItem.querySelector(
                  ".faq-answer"
                );


              if (otherAnswer) {

                otherAnswer.style.maxHeight =
                  null;

              }

            }
          );


          if (!isOpen) {

            item.classList.add(
              "open"
            );


            answer.style.maxHeight =
              answer.scrollHeight +
              "px";

          }

        }
      );

    }
  );


  /* =====================================
     GIFT CARD
  ====================================== */

  const giftOptions =
    document.querySelectorAll(
      ".gift-option"
    );

  const giftCardValue =
    document.getElementById(
      "giftCardValue"
    );

  const giftBuyButton =
    document.getElementById(
      "giftBuyButton"
    );

  const giftMessage =
    document.getElementById(
      "giftMessage"
    );

  let selectedGiftValue =
    "50";


  giftOptions.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          giftOptions.forEach(
            (other) => {

              other.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          selectedGiftValue =
            button.dataset.value;


          if (giftCardValue) {

            giftCardValue.textContent =
              selectedGiftValue ===
              "Custom"
                ? "YOUR VALUE"
                : `$${selectedGiftValue}`;

          }


          if (giftMessage) {

            giftMessage.textContent =
              "";

          }

        }
      );

    }
  );


  if (
    giftBuyButton &&
    giftMessage
  ) {

    giftBuyButton.addEventListener(
      "click",
      () => {

        giftMessage.textContent =
          selectedGiftValue ===
          "Custom"
            ? "Custom value selected. Our Beauty Concierge can help you create your gift."
            : `Your $${selectedGiftValue} Lumière Gift Card has been selected. ♡`;

      }
    );

  }


  /* =====================================
     BEAUTY FINDER
  ====================================== */

  const finderOptions =
    document.querySelectorAll(
      ".finder-option"
    );

  const finderResult =
    document.getElementById(
      "finderResult"
    );

  const finderResultTitle =
    document.getElementById(
      "finderResultTitle"
    );

  const finderResultText =
    document.getElementById(
      "finderResultText"
    );

  const finderBookButton =
    document.getElementById(
      "finderBookButton"
    );


  const finderRecommendations = {

    everyday: {
      title:
        "The Lumière Glow",

      service:
        "The Lumière Glow",

      text:
        "A radiant skin ritual designed for effortless everyday glow."
    },

    event: {
      title:
        "Red Carpet Experience",

      service:
        "Red Carpet Experience",

      text:
        "Hair, skin preparation and professional makeup for an unforgettable event."
    },

    wedding: {
      title:
        "Bridal & Events",

      service:
        "Bridal & Events",

      text:
        "Personalized bridal preparation for your most important beauty moment."
    },

    vacation: {
      title:
        "Lumière Vacation Glow",

      service:
        "Facial Treatment",

      text:
        "Fresh skin, polished beauty and low-maintenance glamour before your getaway."
    }

  };


  finderOptions.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const value =
            button.dataset.finderValue;

          const recommendation =
            finderRecommendations[
              value
            ];


          if (!recommendation) {
            return;
          }


          finderOptions.forEach(
            (option) => {

              option.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );


          if (
            finderResultTitle
          ) {

            finderResultTitle.textContent =
              recommendation.title;

          }


          if (
            finderResultText
          ) {

            finderResultText.textContent =
              recommendation.text;

          }


          if (
            finderBookButton
          ) {

            finderBookButton.dataset.service =
              recommendation.service;

          }


          if (
            finderResult
          ) {

            finderResult.classList.add(
              "show"
            );

          }

        }
      );

    }
  );


  /* =====================================
     BOOKING ELEMENTS
  ====================================== */

  const bookingSection =
    document.getElementById(
      "booking"
    );

  const bookingForm =
    document.getElementById(
      "luxuryBookingForm"
    );

  const bookingSteps =
    document.querySelectorAll(
      ".booking-step"
    );

  const progressSteps =
    document.querySelectorAll(
      ".booking-progress-step"
    );

  const serviceChoices =
    document.querySelectorAll(
      ".service-choice"
    );

  const specialistChoices =
    document.querySelectorAll(
      ".specialist-choice"
    );

  const timeSlots =
    document.querySelectorAll(
      ".time-slot"
    );

  const addonCards =
    document.querySelectorAll(
      ".addon-card"
    );

  const nextButtons =
    document.querySelectorAll(
      ".booking-next"
    );

  const backButtons =
    document.querySelectorAll(
      ".booking-back"
    );

  const selectedServiceInput =
    document.getElementById(
      "selectedService"
    );

  const selectedSpecialistInput =
    document.getElementById(
      "selectedSpecialist"
    );

  const selectedTimeInput =
    document.getElementById(
      "selectedTime"
    );

  const luxuryDate =
    document.getElementById(
      "luxuryDate"
    );


  const selectedAddons = [];


  /* =====================================
     MINIMUM DATE
  ====================================== */

  if (luxuryDate) {

    const today =
      new Date();


    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(
        2,
        "0"
      );

    const day =
      String(
        today.getDate()
      ).padStart(
        2,
        "0"
      );


    luxuryDate.min =
      `${year}-${month}-${day}`;

  }


  /* =====================================
     BOOKING SUMMARY
  ====================================== */

  function updateBookingSummary() {

    const summaryService =
      document.getElementById(
        "summaryService"
      );

    const summarySpecialist =
      document.getElementById(
        "summarySpecialist"
      );

    const summaryDate =
      document.getElementById(
        "summaryDate"
      );

    const summaryTime =
      document.getElementById(
        "summaryTime"
      );

    const summaryAddons =
      document.getElementById(
        "summaryAddons"
      );


    if (summaryService) {

      summaryService.textContent =
        selectedServiceInput?.value ||
        "—";

    }


    if (summarySpecialist) {

      summarySpecialist.textContent =
        selectedSpecialistInput?.value ||
        "—";

    }


    if (summaryDate) {

      summaryDate.textContent =
        luxuryDate?.value ||
        "—";

    }


    if (summaryTime) {

      summaryTime.textContent =
        selectedTimeInput?.value ||
        "—";

    }


    if (summaryAddons) {

      summaryAddons.textContent =
        selectedAddons.length
          ? selectedAddons
              .map(
                (addon) =>
                  `${addon.name} +$${addon.price}`
              )
              .join(", ")
          : "None";

    }

  }


  /* =====================================
     SHOW STEP
  ====================================== */

  function showBookingStep(
    number
  ) {

    bookingSteps.forEach(
      (step) => {

        step.classList.toggle(
          "active",
          Number(
            step.dataset.step
          ) ===
          Number(number)
        );

      }
    );


    progressSteps.forEach(
      (step) => {

        const progress =
          Number(
            step.dataset.progress
          );


        step.classList.toggle(
          "active",
          progress ===
          Number(number)
        );


        step.classList.toggle(
          "completed",
          progress <
          Number(number)
        );

      }
    );


    updateBookingSummary();

  }


  /* =====================================
     SELECT SERVICE
  ====================================== */

  function selectBookingService(
    service
  ) {

    if (!selectedServiceInput) {
      return;
    }


    selectedServiceInput.value =
      service;


    serviceChoices.forEach(
      (choice) => {

        choice.classList.toggle(
          "selected",
          choice.dataset.value ===
          service
        );

      }
    );


    updateBookingSummary();

  }


  serviceChoices.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          selectBookingService(
            button.dataset.value
          );

        }
      );

    }
  );


  /* =====================================
     SPECIALIST
  ====================================== */

  specialistChoices.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          specialistChoices.forEach(
            (other) => {

              other.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );


          if (
            selectedSpecialistInput
          ) {

            selectedSpecialistInput.value =
              button.dataset.value;

          }


          updateBookingSummary();

        }
      );

    }
  );


  /* =====================================
     TIME
  ====================================== */

  timeSlots.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          timeSlots.forEach(
            (other) => {

              other.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );


          if (
            selectedTimeInput
          ) {

            selectedTimeInput.value =
              button.dataset.time;

          }


          updateBookingSummary();

        }
      );

    }
  );


  /* =====================================
     VIP ADD-ONS
  ====================================== */

  addonCards.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const name =
            button.dataset.addon;

          const price =
            button.dataset.price;


          const existingIndex =
            selectedAddons.findIndex(
              (addon) =>
                addon.name ===
                name
            );


          if (
            existingIndex >= 0
          ) {

            selectedAddons.splice(
              existingIndex,
              1
            );


            button.classList.remove(
              "selected"
            );

          } else {

            selectedAddons.push({
              name,
              price
            });


            button.classList.add(
              "selected"
            );

          }


          updateBookingSummary();

        }
      );

    }
  );


  /* =====================================
     NEXT / BACK
  ====================================== */

  nextButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const next =
            Number(
              button.dataset.next
            );


          if (
            next === 2 &&
            !selectedServiceInput?.value
          ) {

            alert(
              "Please choose your beauty experience first."
            );

            return;

          }


          if (
            next === 3 &&
            !selectedSpecialistInput?.value
          ) {

            alert(
              "Please choose your specialist."
            );

            return;

          }


          if (
            next === 4 &&
            (
              !luxuryDate?.value ||
              !selectedTimeInput?.value
            )
          ) {

            alert(
              "Please choose your date and time."
            );

            return;

          }


          showBookingStep(
            next
          );

        }
      );

    }
  );


  backButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showBookingStep(
            Number(
              button.dataset.back
            )
          );

        }
      );

    }
  );


  if (luxuryDate) {

    luxuryDate.addEventListener(
      "change",
      updateBookingSummary
    );

  }


  /* =====================================
     SERVICE BUTTONS OUTSIDE BOOKING
  ====================================== */

  document
    .querySelectorAll(
      ".service-select, .service-book-button"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            if (
              button.tagName ===
              "A"
            ) {

              event.preventDefault();

            }


            const service =
              button.dataset.service;


            selectBookingService(
              service
            );


            showBookingStep(
              1
            );


            bookingSection?.scrollIntoView({
              behavior:
                "smooth"
            });

          }
        );

      }
    );


  /* =====================================
     TEAM BOOKING
  ====================================== */

  document
    .querySelectorAll(
      ".specialist-book"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            selectBookingService(
              button.dataset.service
            );


            if (
              selectedSpecialistInput
            ) {

              selectedSpecialistInput.value =
                button.dataset.specialist;

            }


            specialistChoices.forEach(
              (choice) => {

                choice.classList.toggle(
                  "selected",
                  choice.dataset.value ===
                  button.dataset.specialist
                );

              }
            );


            showBookingStep(
              2
            );


            bookingSection?.scrollIntoView({
              behavior:
                "smooth"
            });

          }
        );

      }
    );


  /* =====================================
     FINDER BOOK BUTTON
  ====================================== */

  if (finderBookButton) {

    finderBookButton.addEventListener(
      "click",
      () => {

        selectBookingService(
          finderBookButton.dataset.service
        );


        showBookingStep(
          1
        );


        bookingSection?.scrollIntoView({
          behavior:
            "smooth"
        });

      }
    );

  }


  /* =====================================
     SUCCESS MODAL
  ====================================== */

  const successModal =
    document.getElementById(
      "successModal"
    );

  const successBackdrop =
    document.getElementById(
      "successBackdrop"
    );

  const successClose =
    document.getElementById(
      "successClose"
    );

  const successDone =
    document.getElementById(
      "successDone"
    );

  const successCopy =
    document.getElementById(
      "successCopy"
    );

  const successService =
    document.getElementById(
      "successService"
    );

  const successSpecialist =
    document.getElementById(
      "successSpecialist"
    );

  const successDate =
    document.getElementById(
      "successDate"
    );

  const successTime =
    document.getElementById(
      "successTime"
    );


  function openSuccessModal(
    name
  ) {

    if (!successModal) {
      return;
    }


    if (successCopy) {

      const addonText =
        selectedAddons.length
          ? ` Your selected enhancements are ${selectedAddons
              .map(
                (addon) =>
                  addon.name
              )
              .join(", ")}.`
          : "";


      successCopy.textContent =
        `Thank you, ${name}. Your reservation request has been beautifully prepared.${addonText}`;

    }


    if (successService) {

      successService.textContent =
        selectedServiceInput?.value ||
        "—";

    }


    if (successSpecialist) {

      successSpecialist.textContent =
        selectedSpecialistInput?.value ||
        "—";

    }


    if (successDate) {

      successDate.textContent =
        luxuryDate?.value ||
        "—";

    }


    if (successTime) {

      successTime.textContent =
        selectedTimeInput?.value ||
        "—";

    }


    successModal.classList.add(
      "show"
    );


    successModal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "success-open"
    );

  }


  function closeSuccessModal() {

    if (!successModal) {
      return;
    }


    successModal.classList.remove(
      "show"
    );


    successModal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "success-open"
    );

  }


  successClose?.addEventListener(
    "click",
    closeSuccessModal
  );


  successBackdrop?.addEventListener(
    "click",
    closeSuccessModal
  );


  successDone?.addEventListener(
    "click",
    () => {

      closeSuccessModal();


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =====================================
     BOOKING SUBMIT
  ====================================== */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const nameInput =
          document.getElementById(
            "luxuryName"
          );

        const emailInput =
          document.getElementById(
            "luxuryEmail"
          );

        const phoneInput =
          document.getElementById(
            "luxuryPhone"
          );


        const name =
          nameInput?.value.trim();

        const email =
          emailInput?.value.trim();

        const phone =
          phoneInput?.value.trim();


        if (
          !name ||
          !email ||
          !phone
        ) {

          alert(
            "Please complete your contact details."
          );

          return;

        }


        openSuccessModal(
          name
        );

      }
    );

  }


  /* =====================================
     CONCIERGE
  ====================================== */

  const conciergeModal =
    document.getElementById(
      "conciergeModal"
    );

  const conciergeFloating =
    document.getElementById(
      "conciergeFloating"
    );

  const conciergeClose =
    document.getElementById(
      "conciergeClose"
    );

  const conciergeBackdrop =
    document.getElementById(
      "conciergeBackdrop"
    );

  const conciergeForm =
    document.getElementById(
      "conciergeForm"
    );

  const conciergeTopic =
    document.getElementById(
      "conciergeTopic"
    );

  const conciergeMessage =
    document.getElementById(
      "conciergeMessage"
    );

  const mobileConcierge =
    document.getElementById(
      "mobileConcierge"
    );


  function openConcierge(
    topic = ""
  ) {

    if (!conciergeModal) {
      return;
    }


    conciergeModal.classList.add(
      "show"
    );


    document.body.classList.add(
      "concierge-open"
    );


    if (
      conciergeTopic &&
      topic
    ) {

      conciergeTopic.value =
        topic;

    }


    if (conciergeMessage) {

      conciergeMessage.textContent =
        "";

    }

  }


  function closeConcierge() {

    if (!conciergeModal) {
      return;
    }


    conciergeModal.classList.remove(
      "show"
    );


    document.body.classList.remove(
      "concierge-open"
    );

  }


  conciergeFloating?.addEventListener(
    "click",
    () => {

      openConcierge(
        "Beauty Consultation"
      );

    }
  );


  mobileConcierge?.addEventListener(
    "click",
    () => {

      openConcierge(
        "Mobile Beauty Concierge"
      );

    }
  );


  document
    .querySelectorAll(
      ".concierge-trigger"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            openConcierge(
              button.dataset.conciergeTopic ||
              ""
            );

          }
        );

      }
    );


  conciergeClose?.addEventListener(
    "click",
    closeConcierge
  );


  conciergeBackdrop?.addEventListener(
    "click",
    closeConcierge
  );


  if (conciergeForm) {

    conciergeForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const conciergeName =
          document
            .getElementById(
              "conciergeName"
            )
            ?.value
            .trim();


        if (
          conciergeMessage
        ) {

          conciergeMessage.textContent =
            `Thank you, ${conciergeName}. Your Beauty Concierge request has been received. Our Lumière team will contact you shortly. ♡`;

        }


        conciergeForm.reset();

      }
    );

  }


  /* =====================================
     NEWSLETTER
  ====================================== */

  const newsletterForm =
    document.getElementById(
      "newsletterForm"
    );

  const newsletterEmail =
    document.getElementById(
      "newsletterEmail"
    );

  const newsletterMessage =
    document.getElementById(
      "newsletterMessage"
    );


  if (
    newsletterForm &&
    newsletterEmail &&
    newsletterMessage
  ) {

    newsletterForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        if (
          !newsletterEmail.value.trim()
        ) {
          return;
        }


        newsletterMessage.textContent =
          "Welcome to Lumière Beauty Notes. You're on the list. ♡";


        newsletterForm.reset();

      }
    );

  }


  /* =====================================
     ESCAPE
  ====================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key ===
        "Escape"
      ) {

        closeLightbox();

        closeConcierge();

        closeSuccessModal();

        closeMobileMenu();

      }

    }
  );


  /* =====================================
     INITIAL
  ====================================== */

  showBookingStep(
    1
  );

  updateBookingSummary();

  updateBackToTop();

});