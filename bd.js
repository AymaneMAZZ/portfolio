// Charger les données JSON
fetch("cv.json")
  .then(response => response.json())
  .then(data => {
    // Remplir les informations personnelles
    document.querySelector(".home__name").textContent = data.name;
    document.querySelector(".home__work").textContent = data.title;
    const contactDetails = `
      <dt>AGE:</dt><dd>${data.contact.age}</dd>
      <dt>PHONE:</dt><dd>${data.contact.phone}</dd>
      <dt>EMAIL:</dt><dd>${data.contact.email}</dd>
      <dt>ADDRESS:</dt><dd>${data.contact.address}</dd>
    `;
    document.querySelector(".home__list").innerHTML = contactDetails;

    // Afficher les compétences
    const skillsContainer = document.querySelector(".skills__container");
    skillsContainer.innerHTML = "";

    ["frontend", "backend"].forEach(category => {
      const skills = data.skills[category]
        .map(skill => `
          <div class="skills__data">
            <div class="skills__titles">
              <p class="skills__name">${skill.name}</p>
              <span class="skills__number">${skill.level}%</span>
            </div>
            <div class="skills__bar">
              <span class="skills__percentage" style="width: ${skill.level}%"></span>
            </div>
          </div>
        `)
        .join("");

      skillsContainer.innerHTML += `
        <div class="skills__content">
          <div class="skills__title">${category.toUpperCase()}</div>
          <div class="skills__list">${skills}</div>
        </div>
      `;
    });

    // Afficher l'éducation
    const educationContainer = document.querySelector(".resume__data");
    educationContainer.innerHTML = data.education
      .map(edu => `
        <div class="resume__item">
          <h3 class="resume__subtitle">${edu.institution}</h3>
          <p class="resume__date">${edu.year}</p>
          <p class="resume__description">${edu.degree}</p>
        </div>
      `)
      .join("");
  })
  .catch(error => console.error("Erreur de chargement des données JSON :", error));
