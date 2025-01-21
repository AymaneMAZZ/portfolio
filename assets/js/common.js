(() => {
    /*=============== Show Menu =============== */
    const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');
  
    /*===== Menu Show =====*/
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
      });
    }
  
    /*===== Hide Show =====*/
    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    }
  
    /*=============== Remove Menu Mobile =============== */
    const navLink = document.querySelectorAll('.nav__link');
    function linkAction() {
      navMenu.classList.remove('show-menu');
    }
    navLink.forEach((n) => n.addEventListener('click', linkAction));
  
    /*=============== Background Header =============== */
    function scrollHeader() {
      const header = document.getElementById('header');
      if (window.scrollY >= 50) header.classList.add('scroll-header');
      else header.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);
  
    /*=============== Contact Form =============== */
    const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      message = document.getElementById('message'),
      contactMessage = document.getElementById('contact-message');
  
    const sendEmail = (e) => {
      e.preventDefault();
      if (
        contactName.value.trim() === '' ||
        contactEmail.value.trim() === '' ||
        message.value.trim() === ''
      ) {
        contactMessage.classList.remove('color-light');
        contactMessage.classList.add('color-dark');
        contactMessage.textContent = 'Write all the input fields';
        return;
      }
      emailjs
        .sendForm(
          'service_u2836qq',
          'template_ynpcmlk',
          '#contact-form',
          'OxNY-YSN63VeSWqn-'
        )
        .then(
          () => {
            contactMessage.classList.remove('color-dark');
            contactMessage.classList.add('color-light');
            contactMessage.textContent = 'Message sent ✔️';
            contactForm.reset();
            setTimeout(() => {
              contactMessage.textContent = '';
            }, 5000);
          },
          (error) => {
            contactMessage.classList.remove('color-light');
            contactMessage.classList.add('color-dark');
            contactMessage.textContent = 'Message sending failed';
            console.error('Error:', error);
          }
        );
    };
    contactForm.addEventListener('submit', sendEmail);
    
    /*=============== Style Switcher =============== */
    const styleSwitcherToggle = document.querySelector('.style__switcher-toggler'),
    styleSwitcher = document.querySelector('.style__switcher');
    styleSwitcherToggle.addEventListener('click', ()=> {
        styleSwitcher.classList.toggle('open');
    });
    //hide switcher on scroll
    window.addEventListener('scroll',()=>{
        if (styleSwitcher.classList.contains('open')) {
            styleSwitcher.classList.remove('open');
            
        }
    })
    const alternateStyles = document.querySelectorAll('.alternate-style');


    window.setActiveStyle = function (color) {
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute('title')) {
                style.removeAttribute('disabled');
            } else {
                style.setAttribute('disabled', 'true');
            }
        });
    };
    

    // Appliquer le style enregistré au chargement
    document.addEventListener('DOMContentLoaded', () => {
        const savedStyle = localStorage.getItem('preferredStyle');
        if (savedStyle) {
            setActiveStyle(savedStyle);
        }
    });





  })();

  // Fetch from json file 
  document.addEventListener("DOMContentLoaded", function () {
    fetch("./assets/data/data.json") 

        .then(response => response.json())
        .then(data => {
            // Update personal information
            document.querySelector(".home__name").textContent = data.personalInfo.name;
            document.querySelector(".home__work").textContent = data.personalInfo.jobTitle;
            document.querySelector(".home__list dd:nth-of-type(1)").textContent = data.personalInfo.age;
            document.querySelector(".home__list dd:nth-of-type(2)").textContent = data.personalInfo.phone;
            document.querySelector(".home__list dd:nth-of-type(3)").textContent = data.personalInfo.email;
            document.querySelector(".home__list dd:nth-of-type(4)").textContent = data.personalInfo.address;
            document.querySelector(".hello__details").textContent = data.personalInfo.about;
            document.querySelector(".button--flex").href = data.personalInfo.cvLink;

             // Update social links
             document.querySelector(".home__social-link[href*='github']").href = data.personalInfo.socialLinks.github;
             document.querySelector(".home__social-link[href*='linkedin']").href = data.personalInfo.socialLinks.linkedin;
             document.querySelector(".home__social-link[href*='facebook']").href = data.personalInfo.socialLinks.facebook;

            // Update services
            let servicesContainer = document.querySelector(".services__container");
            servicesContainer.innerHTML = ""; // Clear existing services
            data.services.forEach(service => {
                let serviceItem = `
                    <div class="services__item">
                        <div class="icon__box">
                            <img src="assets/img/web-design.png" alt="" class="services__icon">
                            <div class="services__dot"><span class="dot"></span></div>
                        </div>
                        <h3 class="services__title text-lg">${service.title}</h3>
                        <p class="services__detail">${service.description}</p>
                    </div>
                `;
                servicesContainer.innerHTML += serviceItem;
            });

            // Update skills
            updateSkills(".skills__list:nth-of-type(1)", data.skills.frontend);
            updateSkills(".skills__list:nth-of-type(2)", data.skills.backend);
        })
        .catch(error => console.error("Error loading JSON data:", error));
});

// Function to update skills dynamically
function updateSkills(selector, skills) {
    let skillsContainer = document.querySelector(selector);
    skillsContainer.innerHTML = "";
    for (let skill in skills) {
        let skillItem = `
            <div class="skills__data">
                <div class="skills__titles">
                    <p class="skills__name text-sm">${skill}</p>
                    <span class="skills__number text-sm">${skills[skill]}%</span>
                </div>
                <div class="skills__bar">
                    <span class="skills__percentage" style="width: ${skills[skill]}%"></span>
                </div>
            </div>
        `;
        skillsContainer.innerHTML += skillItem;
    }
}


 