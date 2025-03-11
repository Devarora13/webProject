//scroll load effect whole page------------------------------------------------------>

const scrollEffect = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.style.animation = "appear 1s ease-in";
      scrollEffect.unobserve(entry.target);
    }
  });
});
const scrollEffectElements = document.querySelectorAll(".scrollEffect");
scrollEffectElements.forEach((each)=>{
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

  const growingNumbersObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers("projects", 0, 200, 2000);
        animateNumbers("clients", 0, 35, 2000);
        animateNumbers("countries", 0, 25, 2000);
        
        observer.unobserve(entry.target); // Stop the animation even if scrolled again
      }
    });
  });

  growingNumbersObserver.observe(achievementBox);
});

// clients images moving------------------------------------------------------------->

document.addEventListener("DOMContentLoaded", () => {
  const clientBox = document.querySelector('.clientBox');
  if (!clientBox) return; // Stop execution if element is missing

  const clone = clientBox.innerHTML; // Clone the content
  clientBox.innerHTML += clone; // Append cloned content for smooth looping

  let scrollPosition = 0;

  function autoScroll() {
    scrollPosition += 1; // Adjust speed here
    clientBox.scrollLeft = scrollPosition;

    if (scrollPosition >= clientBox.scrollWidth / 2) {
      scrollPosition = 0; // Reset to start when halfway through
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
});


// career form show handle ----------------------------------------------------->
const careerButtons = document.querySelectorAll('.careerButton');
const jobTitle = document.getElementById('exampleModalLabel');
const jobField = document.getElementById('jobRole');

careerButtons.forEach((careerButton)=>{
  careerButton.addEventListener('click', ()=>{
    let jobRole = careerButton.getAttribute('jobRole')
    jobTitle.innerHTML = `Applying for ${jobRole}`;
    jobField.value = jobRole;
  });
});

