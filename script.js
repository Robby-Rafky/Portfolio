document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navIndicator = document.querySelector(".nav-indicator");
  const sectionNames = ["Home", "Looking for Work", "Skills", "About Me", "Projects", "Education"];

  const floatingTitle = document.createElement("div");
  floatingTitle.classList.add("floating-title");
  document.body.appendChild(floatingTitle);

  sections.forEach((section, index) => {
    let dot = document.createElement("div");
    dot.dataset.index = index;
    dot.addEventListener("click", () => updateSections(index, true)); 
    navIndicator.appendChild(dot);
  });

  let currentIndex = 0;
  let scrollThreshold = 80;
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

        let dotRect = dot.getBoundingClientRect();
        floatingTitle.style.top = `${dotRect.top}px`;
        floatingTitle.style.right = "40px"; 
      }
    });

    currentIndex = index;
    scrollCount = 0; 
  };

  document.addEventListener("wheel", (event) => {
    scrollCount += Math.abs(event.deltaY);

    if (scrollCount > scrollThreshold) {
      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        updateSections(currentIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        updateSections(currentIndex - 1);
      }
      scrollCount = 0; 
    }
  });

  updateSections(0); 
});
