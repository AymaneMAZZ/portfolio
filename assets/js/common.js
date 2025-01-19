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

//    function setActiveStyle(color){
//     alternateStyles.forEach((style) => {
//         if(color === style.getAttribute('title')){
//             style.removeAttribute('disabled');
//         }else{
//             style.setAttribute('disabled','true');
//         }
//     });
//    }


    // function setActiveStyle(color) {
    //     alternateStyles.forEach((style) => {
    //         if (color === style.getAttribute('title')) {
    //             style.removeAttribute('disabled');
    //             localStorage.setItem('preferredStyle', color); // Sauvegarde
    //         } else {
    //             style.setAttribute('disabled', 'true');
    //         }
    //     });
    // }

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
  