document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navIndicator = document.querySelector(".nav-indicator");
  const sectionNames = ["Home", "About Me", "Skills", "Education", "Projects"];

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

  // Project Card Logic
  const projectTitles = document.querySelectorAll(".project-title");
  const projectDetailTitle = document.getElementById("project-detail-title");
  const projectDetailDescription = document.getElementById("project-detail-description");
  const projectDetailLibraries = document.getElementById("project-detail-libraries");
  const projectDetailLink = document.getElementById("project-detail-link");

  const projectDescriptions = {
    "Cover Letter Agent" : "An AI agent setup to generate cover letters for an applicant, tailored to a job description and personalised to the applicant's skillset. With an easy to navigate UI and modular setup, the application can be adapted to generate anything that requires applicant information tailored to any external paramaters.",
    "3D object detection for locating telephone poles in LiDAR point clouds [In partnership with BT]": "Designed and implemented a machine learning pipeline to detect telephone poles in LiDAR point clouds as part of a Master's thesis in collaboration with BT. Utilised Python libraries such as Ultralytics and NumPy for model development, Matplotlib for visualization, and custom data augmentation techniques. 3D point clouds are encoded as 2D images for much faster processing and to single out details.",
    "Ponder LIVETRACK": "Collaborated on a university project to develop a remote water quality monitoring system, PONDER, which autonomously measures indicators such as temperature, total dissolved solids (TDS), turbidity, and pH levels. The system utilizes Arduino for sensor integration, Bluetooth for local transmission, and GSM/GPRS modules for remote communication. Data is processed and displayed on an Android application built using Kotlin, contributing to the UK's Clean Growth Grand Challenge.",
    "Audio-Visual Object Event Tracking in Time and Space": "Developed a Bachelor's project tracking objects in real time using depth inference to accurately determine object location within a 2D frame. Audio mapped to the object's location to simulate audio from that location. Other techniques such as searching a local scaled frame improves accuracy. The project provides non-sonorus objects audio for the use case of informing visually impared individuals of potential obstacles with accurate directional audio.",
    "NLP Project: Classification using NER": "Conducted model training and analysis for natural language processing tasks using nltk and sk-learn. Focused on recognizing and classifying named entities in text, handling both long-form and abbreviated formats, and enhancing model performance through identifier tokens and custom preprocessing pipelines.",
    "AI Audio Synthesis and analysis": "A coursework project using Python to process audio signals and extract formant frequencies. A trained model synthesises audio using formant frequencies from the input audio file.",
    "Scene Recognition": "Engaged in model training and analysis for scene classification using Google Colab. The project included visualization of model layers, providing insights into hidden layers' decision-making processes.",
    "Python Gardening Game": "Designed and implemented a gardening simulation game using Python, incorporating features like plant mutation algorithms, an expandable skill tree, and inventory management. Demonstrated skills in game development, user interface and user experience design.",
    "PoE Loadout Desktop": "Developed a desktop tool for Path of Exile using Python, leveraging Pandas for data processing, Tkinter for the user interface, and the POE.ninja API for real-time price updates. Implemented features to centralize item listings and streamline data visualization, showcasing skills in API integration, data handling, and desktop application development."
  };

  const projectLibraryData = {
    "Cover Letter Agent": ["Python", "Langchain", "Tkinter", "Together.ai"],
    "3D object detection for locating telephone poles in LiDAR point clouds [In partnership with BT]": ["Python", "Sci-Py", "Ultralytics", "openCV", "numPy", "open3d", "Google Colab"],
    "Ponder LIVETRACK": ["Kotlin", "Azure", "C++", "PHP"],
    "Audio-Visual Object Event Tracking in Time and Space": ["Python", "openCV", "Pygame", "numPy", "Pyglet", "imutils"],
    "NLP Project: Classification using NER": ["Python", "transformers", "nltk", "Scikit-Learn", "JSON", "Google Colab"],
    "AI Audio Synthesis and analysis": ["Python", "PyTorch", "torchvision", "numPy", "Scikit-Learn"],
    "Scene Recognition": ["Python", "Sci-Py", "Google Colab"],
    "Python Gardening Game": ["Python", "Pygame", "JSON"],
    "PoE Loadout Desktop": ["Python", "Pandas", "JSON", "Tkinter"]
  };

  const projectLinks = {
    "3D object detection for locating telephone poles in LiDAR point clouds [In partnership with BT]": "https://github.com/Robby-Rafky/3D-object-detection-for-locating-telephone-poles-in-LiDAR-point-clouds",
    "Cover Letter Agent" : "https://github.com/Robby-Rafky/CoverLetter_Gen_Agent",
    "Ponder LIVETRACK": "https://github.com/sporadicE/PONDER",
    "Audio-Visual Object Event Tracking in Time and Space": "https://github.com/Robby-Rafky/Audio-Visual-Object-Event-Tracking-In-Time-And-Space",
    "NLP Project: Classification using NER": "https://github.com/Robby-Rafky/NLP-Project-Classification-using-Named-Entity-Recognition",
    "AI Audio Synthesis and analysis": "https://github.com/Robby-Rafky/AI-Audio-Synth",
    "Scene Recognition": "https://github.com/Robby-Rafky/Scene_Recognition_CW",
    "Python Gardening Game": "https://github.com/Robby-Rafky/Nameless_Gardening_Game",
    "PoE Loadout Desktop": "https://github.com/Robby-Rafky/PoELoadoutDESKTOP"
  };

  function updateProjectDetails(projectName) {
    projectDetailTitle.textContent = projectName;
    projectDetailDescription.textContent = projectDescriptions[projectName] || "Description not available.";
    projectDetailLink.href = projectLinks[projectName] || "#";

    projectDetailLibraries.innerHTML = '';
    if (projectLibraryData[projectName]) {
      projectLibraryData[projectName].forEach(library => {
        const li = document.createElement('li');
        li.textContent = library;
        projectDetailLibraries.appendChild(li);
      });
    }
  }

  function setInitialSelection() {
    projectTitles[0].classList.add("selected");
    updateProjectDetails(projectTitles[0].dataset.projectName);
  }

  projectTitles.forEach(title => {
    title.addEventListener("click", () => {
      projectTitles.forEach(t => t.classList.remove("selected"));
      title.classList.add("selected");
      updateProjectDetails(title.dataset.projectName);
    });
  });

  setInitialSelection(); 
});
