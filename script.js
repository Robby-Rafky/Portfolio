document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navIndicator = document.querySelector(".nav-indicator");
  const sectionNames = ["Home", "Looking for Work", "Skills", "About Me", "Projects", "Education"];

  // Create navigation dots and floating title
  const floatingTitle = document.createElement("div");
  floatingTitle.classList.add("floating-title");
  document.body.appendChild(floatingTitle);

  sections.forEach((section, index) => {
    let dot = document.createElement("div");
    dot.dataset.index = index;
    dot.addEventListener("click", () => updateSections(index, true)); // Enable click
    navIndicator.appendChild(dot);
  });

  let currentIndex = 0;
  let scrollThreshold = 80; // Adjust scrolling sensitivity
  let scrollCount = 0;

  const updateSections = (index) => {
    sections.forEach((section, i) => {
      if (i === index) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });

    document.querySelectorAll(".nav-indicator div").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);

      if (i === index) {
        floatingTitle.innerText = sectionNames[i];

        // Get dot position and update floating title
        let dotRect = dot.getBoundingClientRect();
        floatingTitle.style.top = `${dotRect.top}px`;
        floatingTitle.style.right = "40px"; // Offset from the dot
      }
    });

    currentIndex = index;
    scrollCount = 0; // Reset scroll counter
  };

  document.addEventListener("wheel", (event) => {
    scrollCount += Math.abs(event.deltaY);

    if (scrollCount > scrollThreshold) {
      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        updateSections(currentIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        updateSections(currentIndex - 1);
      }
      scrollCount = 0; // Reset after changing section
    }
  });

  updateSections(0); // Set initial section
});
