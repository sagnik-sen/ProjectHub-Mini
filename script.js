// Sample Projects Data
let projects = [
  {
    id: 1,
    title: "AI Study Buddy",
    domain: "AI / ML",
    techStack: ["Python", "Flask", "OpenAI API"],
    description: "A chatbot that helps students study smarter with AI.",
    github: "https://github.com/",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Expense Tracker",
    domain: "Web Development",
    techStack: ["HTML", "CSS", "JavaScript"],
    description: "Track daily expenses with category breakdown.",
    github: "https://github.com/",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Freelance Escrow dApp",
    domain: "Blockchain",
    techStack: ["Solidity", "Ethers.js", "MetaMask"],
    description: "Milestone-based escrow payment platform for freelancers.",
    github: "https://github.com/",
    live: "https://example.com",
  },
];

// Elements
const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");

// Sections
const exploreSection = document.getElementById("exploreSection");
const submitSection = document.getElementById("submitSection");

// Navbar buttons
const exploreBtn = document.getElementById("exploreBtn");
const submitBtn = document.getElementById("submitBtn");

// Form
const projectForm = document.getElementById("projectForm");
const titleInput = document.getElementById("titleInput");
const domainInput = document.getElementById("domainInput");
const techInput = document.getElementById("techInput");
const descInput = document.getElementById("descInput");
const githubInput = document.getElementById("githubInput");
const liveInput = document.getElementById("liveInput");

// Modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDomain = document.getElementById("modalDomain");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");

// Render Projects
function renderProjects(list) {
  projectsGrid.innerHTML = "";

  if (list.length === 0) {
    projectsGrid.innerHTML = `<div class="card"><h3>No projects found 😭</h3></div>`;
    return;
  }

  list.forEach((project) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-top">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <span class="pill">${project.domain}</span>
        </div>
        <button class="btn secondary view-btn" data-id="${project.id}">View</button>
      </div>

      <p class="project-desc">${project.description}</p>

      <div>
        ${project.techStack.slice(0, 4).map(t => `<span class="pill">${t}</span>`).join("")}
      </div>
    `;

    projectsGrid.appendChild(card);
  });

  // View buttons listener
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      openModal(id);
    });
  });
}

// Search + Filter logic
function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const domain = domainFilter.value;

  const filtered = projects.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query) ||
      p.techStack.join(" ").toLowerCase().includes(query);

    const matchesDomain = domain === "All" ? true : p.domain === domain;

    return matchesQuery && matchesDomain;
  });

  renderProjects(filtered);
}

// Modal open
function openModal(id) {
  const project = projects.find((p) => p.id === id);
  if (!project) return;

  modalTitle.textContent = project.title;
  modalDomain.textContent = project.domain;
  modalDesc.textContent = project.description;

  modalTech.innerHTML = "";
  project.techStack.forEach((t) => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = t;
    modalTech.appendChild(span);
  });

  // Links
  if (project.github) {
    modalGithub.href = project.github;
    modalGithub.style.display = "inline-block";
  } else {
    modalGithub.style.display = "none";
  }

  if (project.live) {
    modalLive.href = project.live;
    modalLive.style.display = "inline-block";
  } else {
    modalLive.style.display = "none";
  }

  modal.classList.remove("hidden");
}

// Modal close
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Navbar switch
exploreBtn.addEventListener("click", () => {
  exploreSection.classList.remove("hidden");
  submitSection.classList.add("hidden");
  exploreBtn.classList.add("active");
  submitBtn.classList.remove("active");
});

submitBtn.addEventListener("click", () => {
  submitSection.classList.remove("hidden");
  exploreSection.classList.add("hidden");
  submitBtn.classList.add("active");
  exploreBtn.classList.remove("active");
});

// Form Submit
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProject = {
    id: Date.now(),
    title: titleInput.value.trim(),
    domain: domainInput.value,
    techStack: techInput.value
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    description: descInput.value.trim(),
    github: githubInput.value.trim(),
    live: liveInput.value.trim(),
  };

  projects.unshift(newProject);

  // Reset
  projectForm.reset();

  alert("✅ Project submitted successfully!");

  // Switch to Explore
  exploreBtn.click();
  applyFilters();
});

// Event listeners for filter inputs
searchInput.addEventListener("input", applyFilters);
domainFilter.addEventListener("change", applyFilters);

// Initial render
renderProjects(projects);
