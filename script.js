//scroll load effect whole page------------------------------------------------------>

const scrollEffect = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "appear 1s ease-in";
      scrollEffect.unobserve(entry.target);
    }
  });
});
const scrollEffectElements = document.querySelectorAll(".scrollEffect");
scrollEffectElements.forEach((each) => {
  scrollEffect.observe(each);
});

//growing no's on achievement box------------------------------------------------------>

document.addEventListener("DOMContentLoaded", () => {
  const achievementBox = document.querySelector(".achievements");
  if (!achievementBox) return; // Ensure the element exists before observing

  function animateNumbers(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return; // Ensure the target element exists

    const increment = (end - start) / (duration / 10); // Calculate increment per frame (10ms)
    let current = start;

    const timer = setInterval(() => {
      current += increment; // Update the current value
      if (current >= end) {
        clearInterval(timer); // Stop the animation when reaching the end
        current = end; // Ensure the final value is exact
      }
      element.textContent = Math.floor(current) + "+"; // Display the value
    }, 10); // Update every 10ms
  }

  const growingNumbersObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers("projects", 0, 200, 2000);
          animateNumbers("clients", 0, 35, 2000);
          animateNumbers("countries", 0, 25, 2000);

          observer.unobserve(entry.target); // Stop the animation even if scrolled again
        }
      });
    }
  );

  growingNumbersObserver.observe(achievementBox);
});

// career form show handle ----------------------------------------------------->
const careerButtons = document.querySelectorAll(".careerButton");
const jobTitle = document.getElementById("exampleModalLabel");
const jobField = document.getElementById("jobRole");

careerButtons.forEach((careerButton) => {
  careerButton.addEventListener("click", () => {
    let jobRole = careerButton.getAttribute("jobRole");
    jobTitle.innerHTML = `Applying for ${jobRole}`;
    jobField.value = jobRole;
  });
});

//Industries page handle-------------------------------------------------------->
document.addEventListener('DOMContentLoaded', function() {
  // Industry data
  const industries = [
      {
          title: "Healthcare & Pharmaceuticals",
          icon: "fa-solid fa-hospital",
          content: "From market access strategies to real-world evidence studies, we provide in-depth insights for pharmaceutical companies, medical device manufacturers, and healthcare providers. Our research supports drug development, patient experience studies, and healthcare professional engagement."
      },
      {
          title: "Technology & Telecommunications",
          icon: "fa-solid fa-microchip",
          content: "In a fast-evolving tech landscape, staying ahead requires precise market intelligence. We help technology firms, telecom providers, and SaaS companies understand user behavior, product performance, and emerging industry trends."
      },
      {
          title: "Consumer Goods & Retail",
          icon: "fa-solid fa-shopping-cart",
          content: "From product testing to customer satisfaction analysis, we assist FMCG brands and retailers in understanding consumer preferences, optimizing pricing strategies, and enhancing brand loyalty in a competitive market."
      },
      {
          title: "Financial Services & Insurance",
          icon: "fa-solid fa-landmark",
          content: "We provide data-driven insights to banks, fintech firms, and insurance companies, helping them assess risk, improve customer experience, and refine financial products for evolving market needs."
      },
      {
          title: "Automotive & Mobility",
          icon: "fa-solid fa-car",
          content: "Our research in the automotive sector covers vehicle preferences, brand perception, electric vehicle adoption, and mobility trends, enabling manufacturers and service providers to align with shifting consumer demands."
      },
      {
          title: "B2B & Industrial Markets",
          icon: "fa-solid fa-industry",
          content: "We support manufacturers, supply chain operators, and industrial service providers with research on market expansion, business decision-making, and competitive benchmarking in complex B2B environments."
      },
      {
          title: "Media, Advertising & Entertainment",
          icon: "fa-solid fa-film",
          content: "From audience analysis to ad effectiveness measurement, we help media agencies, broadcasters, and entertainment companies optimize their content and marketing strategies for maximum impact."
      },
      {
          title: "Travel, Tourism & Hospitality",
          icon: "fa-solid fa-plane",
          content: "We analyze traveler behavior, guest satisfaction, and market trends to help hotels, airlines, and tourism boards enhance customer experiences and tailor offerings to evolving demands."
      },
      {
          title: "Energy & Utilities",
          icon: "fa-solid fa-bolt",
          content: "We assist energy companies in understanding regulatory trends, customer expectations, and sustainability initiatives to drive innovation in renewable energy, oil & gas, and utility services."
      },
      {
          title: "Government & Public Sector",
          icon: "fa-solid fa-landmark-dome",
          content: "Our research supports policy-making, citizen engagement, and social program effectiveness, helping government agencies and NGOs make informed decisions based on real-world data."
      }
  ];
  
  let currentSlide = 0;
  const totalSlides = industries.length;
  
  // Initialize slider
  function initSlider() {
      const sliderContainer = document.getElementById('industrySlider');
      const indicatorsContainer = document.getElementById('indicators');
      
      // Create slides
      industries.forEach((industry, index) => {
          const slide = document.createElement('div');
          slide.className = `slider-card card rounded-4 shadow ${index === 0 ? 'active' : ''} min-vh-50`;
          
          slide.innerHTML = `
              <div class="card-body p-4 p-md-5 text-center">
                  <div class="slider-icon mb-4 mx-auto">
                      <i class="${industry.icon}"></i>
                  </div>
                  <h3 class="slider-card-title fw-bold fs-3 mb-4">${industry.title}</h3>
                  <p>${industry.content}</p>
              </div>
          `;
          
          sliderContainer.appendChild(slide);
          
          // Create indicator
          const indicator = document.createElement('div');
          indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
          indicator.setAttribute('data-index', index);
          indicator.addEventListener('click', () => goToSlide(index));
          
          indicatorsContainer.appendChild(indicator);
      });
      
      checkButtonsState();
  }
  
  // Go to specific slide
  function goToSlide(index) {
      if (index < 0 || index >= totalSlides) return;
      
      const slides = document.querySelectorAll('.slider-card');
      const indicators = document.querySelectorAll('.indicator');
      
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      currentSlide = index;
      checkButtonsState();
  }
  
  // Check buttons state
  function checkButtonsState() {
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      prevBtn.classList.toggle('disabled', currentSlide === 0);
      nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
  }
  
  // Initialize
  initSlider();
  
  // Navigation buttons
  document.getElementById('nextBtn').addEventListener('click', function() {
      if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
      }
  });
  
  document.getElementById('prevBtn').addEventListener('click', function() {
      if (currentSlide > 0) {
          goToSlide(currentSlide - 1);
      }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowRight') {
          if (currentSlide < totalSlides - 1) {
              goToSlide(currentSlide + 1);
          }
      } else if (event.key === 'ArrowLeft') {
          if (currentSlide > 0) {
              goToSlide(currentSlide - 1);
          }
      }
  });
});
