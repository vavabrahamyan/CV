const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')



const navLink = document.querySelectorAll('.nav-link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)



function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if (getWidth() < 968) {
        if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
        else scrollTop.classList.remove('show-scroll')
    }

}
window.addEventListener('scroll', scrollTop)

// dark theme

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)

}

let pdfLink = './pdf/cv-light-mode.pdf';


themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

    console.log(document.body.classList)

    if (document.body.classList.length !== 0) {
        pdfLink = './pdf/cv-dark-mode.pdf'
    } else {
        pdfLink = './pdf/cv-light-mode.pdf'
    }

    document.getElementById('downloadPDF').setAttribute('href', pdfLink);
})


// change document size to A4 format

function scaleCv() {
    document.body.classList.add('scale-cv')
}

// feedback size after downloading

function removeScale() {
    document.body.classList.remove('scale-cv')
}

/*=><= GENERATE PDF =><=*/

// // PDF generated area

let print_element = document.getElementById('cv-area')

let button = document.getElementById('resume-button')

let opt = {
    margin: 0,
    filename: 'vavabrahamyan_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
}


let generatePDF = (button, element) => {
    button.addEventListener('click', () => {
        scaleCv()
        html2pdf(element, opt)
        setTimeout(removeScale, 5000)
    })
}

generatePDF(button, print_element)


// copy email when click

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

// download PDF in mobile responsive








function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

var alertAboutCopy = function (textType) {
    let _tempId;
    if (textType == 'email') {
        _tempId = 'alert-oncopy-email';
    } else if (textType == 'phone') {
        _tempId = 'alert-oncopy-phone';

    }
    document.getElementById(_tempId).className = "alert-oncopy animate__animated animate__bounceInLeft";
    setTimeout(() => {
        document.getElementById(_tempId).className = "alert-oncopy animate__animated animate__bounceOutRight";

        setTimeout(()=>{document.getElementById(_tempId).className = "_d-none"}, 500);
    }, 2000)
}

const animated = document.getElementById('phone-animate');

animated.addEventListener('animationend', () => {
  console.log('Animation ended');
  document.getElementById('phone-animate').className = 'bx bx-phone home-icon '
  document.getElementById('sendEmail').style.display = 'none'
  setTimeout(()=>{
       document.getElementById('phone-animate').className = 'bx bx-phone home-icon animate__animated animate__tada'
       document.getElementById('sendEmail').style.display = 'block'
  },1000)
});

const animatedM = document.getElementById('email-animate');

animatedM.addEventListener('animationend', () => {
  console.log('Animation ended');
  document.getElementById('email-animate').className = 'bx bx-envelope home-icon'
  document.getElementById('callME').style.display = 'block'
  setTimeout(()=>{
       document.getElementById('email-animate').className = 'bx bx-envelope home-icon animate__animated animate__tada'
       document.getElementById('callME').style.display = 'none'
  },1000)
});