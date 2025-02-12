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

  // Project Card Click Logic
  const projectTitles = document.querySelectorAll(".project-title");
  const projectDetailTitle = document.getElementById("project-detail-title");
  const projectDetailDescription = document.getElementById("project-detail-description");
  const projectDetailLibraries = document.getElementById("project-detail-libraries");
  const projectDetailLink = document.getElementById("project-detail-link");

  const projectDescriptions = {
    "3D Object Detection": "Developed a pipeline to detect telephone poles in LiDAR point clouds, improving detection efficiency.",
    "Ponder LIVETRACK": "Collaborated on a remote water quality monitoring system, integrating IoT sensors with real-time data processing.",
    "Audio-Visual Object Event Tracking": "Developed a system that infers 3D depth from 2D camera input and maps audio dynamically."
  };

  const projectLibraryData = {
    "3D Object Detection": ["PyTorch", "Open3D"],
    "Ponder LIVETRACK": ["Flask", "MQTT"],
    "Audio-Visual Object Event Tracking": ["OpenCV", "PyAudio"]
  };

  const projectLinks = {
    "3D Object Detection": "https://github.com/Robby-Rafky/3D-object-detection-for-locating-telephone-poles-in-LiDAR-point-clouds",
    "Ponder LIVETRACK": "https://github.com/sporadicE/PONDER",
    "Audio-Visual Object Event Tracking": "https://github.com/Robby-Rafky/Audio-Visual-Object-Event-Tracking-In-Time-And-Space"
  };

  // Function to update project details
  function updateProjectDetails(projectName) {
    projectDetailTitle.textContent = projectName;
    projectDetailDescription.textContent = projectDescriptions[projectName] || "Description not available.";
    projectDetailLink.href = projectLinks[projectName] || "#";

    // Update libraries list
    projectDetailLibraries.innerHTML = ''; // Clear existing list
    if (projectLibraryData[projectName]) {
      projectLibraryData[projectName].forEach(library => {
        const li = document.createElement('li');
        li.textContent = library;
        projectDetailLibraries.appendChild(li);
      });
    }
  }

  // Function to set initial selection and load details
  function setInitialSelection() {
    projectTitles[0].classList.add("selected");
    updateProjectDetails(projectTitles[0].dataset.projectName);
  }

  // Add click listeners to project titles
  projectTitles.forEach(title => {
    title.addEventListener("click", () => {
      // Remove "selected" class from all titles
      projectTitles.forEach(t => t.classList.remove("selected"));
      // Add "selected" class to the clicked title
      title.classList.add("selected");
      // Update project details
      updateProjectDetails(title.dataset.projectName);
    });
  });

  setInitialSelection(); // Set initial selection on page load
});
