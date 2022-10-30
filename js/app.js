// navigation dropdown / accordion for smaller screens
const logo = document.querySelector('.logo');
const root = document.querySelector('.root');
const body = document.querySelector('.body-div');

const tab = document.querySelector(".nav-ul");
const container = document.querySelector(".hamm-div");
const content = document.querySelector(".hamm-content");

const stack = document.querySelector('.stack-btn');
const items = document.querySelector('.sectionsection');

const slider = document.querySelector('.slider');
const grabSlider = document.querySelector('.slider-div')
const innerGrabSlider = document.querySelector('.sectionUnStack')
const sliderContainer = document.querySelector('.next')

const profile = document.querySelectorAll('.about-btn');
const profileDisplay = document.querySelector('.profile-modal');
const project = document.querySelectorAll('.project-btn');
const projectDisplay = document.querySelector('.project-modal');

const contactDisplay = document.querySelectorAll('.contact');
const displayModal = document.querySelector('.contact-modal');
const close = document.querySelector('.contact-close');

const videoDisplay = document.querySelector('.fancy');
const displayVideo = document.querySelector('.fancyvideo');

const profilePicture = document.querySelectorAll('.profilePicture');
const profileContainer = document.querySelector('.profileContainer');
const profileModal = document.querySelector('.profileModal');

// logo refresh

logo.onclick = () => {
    window.location.reload();
}

// profile modal

profilePicture.forEach(picture => {
    picture.onclick = (e) => {
        target = e.target;
        toggleHamm();
        profileContainer.classList.add('show');
        profileModal.innerHTML = `<img src="${target.src}" alt="${target.alt} />`
    }
});

profileContainer.onclick = (e) => {
    if (e.target.classList.contains('profileContainer')){
        profileContainer.classList.remove('show')
    } else {
        profileContainer.classList.add('show');
    }
}


// hamm div
const toggleHammOpen = () => {
    container.classList.toggle("animate");
    content.classList.toggle("animate");
};

const toggleHamm = () => {
    container.classList.remove("animate");
    content.classList.remove("animate");
};

container.onclick = toggleHammOpen;

// animating the body of the page

const tl = gsap.timeline({ duration: 0.5, opacity: 1, ease: 'power2.easeOut'})

tl.
    from('nav',
        { y: '-100%', ease: 'bounce'})

    .to('.img1',
        { x: "0%", opacity: 1 }, '<10%')

    .from('h2, .intro-section',
        { x: '-100%', opacity: 1 }, '<5%');


// stack items toggle

stack.addEventListener(
    'click',
    () => {
        let pressed = stack.getAttribute("aria-pressed");
        if (pressed === 'false') {
            stack.setAttribute('aria-pressed', 'true');

            stack.textContent = 'Unstack Items';

            items.setAttribute('class', 'sectionsection sectionStack')

            slider.style.cssText = 'display:none';

            grabSlider.style.cssText = 'pointer-events: none;';
        } else {
            stack.setAttribute('aria-pressed', 'false');

            stack.textContent = 'Stack Items';

            items.setAttribute('class', 'sectionsection sectionUnStack');

            slider.style.cssText = 'display: block;';

            grabSlider.style.cssText = 'pointer-events: visible;';

            stack.style.cssText = 'background-color: whitesmoke;';
        }
    }, false
)

const scrollAppear = () => {
    let general = document.querySelector('.slider-div');
    let generalPosition = general.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.3;

    if (generalPosition < screenPosition) {
        general.classList.add('slider-div-appear');
    } else {
        general.classList.remove('slider-div-appear')
    }
}
window.onscroll = () => {
    scrollAppear();
}
scrollAppear();

// slider btn & content

const sliderBtn = () => {
    let pills = document.querySelectorAll('.pills');
    let buttons = document.querySelectorAll('.move-btn');
    let pillsPages = Math.ceil(pills.length);
    let l = 0;
    let movePer;
    let maxMove;

    // Mobile View
    let mobileView = window.matchMedia("(min-width: 268px)");
    if (mobileView.matches) {
        movePer = 109.50;
        maxMove = 406;
    }

    let tabView = window.matchMedia("(min-width: 800px)");
    if (tabView.matches) {
        movePer = 85.50;
        maxMove = 300;
    }

    let deskView = window.matchMedia("(min-width: 1024px)");
    if (deskView.matches) {
        movePer = 70.50;
        maxMove = 275;
    }

    let ultraView = window.matchMedia("(min-width: 1280px)");
    if (ultraView.matches) {
        movePer = 70.50;
        maxMove = 195;
    }

    let rightMover = () => {
        l = l + movePer;
        if (pills == l) {
            l = 0
        }
        for (let i of pills) {
            if (l > maxMove) {
                l = l - movePer;
                buttons[1].setAttribute('disabled', 'true');
                buttons[1].style.cursor = 'disabled';
            }
            i.style.left = '-' + l + '%';
        }
    }

    // event listener
    buttons[1].onclick = () => {
        rightMover();
        stack.setAttribute('disabled', 'true');
        stack.style.cursor = 'disabled';
        buttons[0].removeAttribute('disabled');
        buttons[0].style.cursor = 'pointer';
        grabSlider.style.cssText = 'pointer-events: none;';
    }

    let leftMover = () => {
        l = l - movePer;
        if (l <= 0) {
            l = 0;
            buttons[0].setAttribute('disabled', 'true');
            buttons[0].style.cursor = 'disabled';
            stack.removeAttribute('disabled');
            stack.style.cursor = 'pointer';
            grabSlider.style.cssText = 'pointer-events: visible;';
        }
        for (let i of pills) {
            if (pillsPages > 1)
                i.style.left = '-' + l + '%';
        }
    }
    // event listener
    buttons[0].onclick = () => {
        leftMover();
        buttons[1].removeAttribute('disabled');
        buttons[1].style.cursor = 'pointer';
    }
}
sliderBtn();


// dragging event for slide

const dragSlide = () => {
    let pressed = false;
    let startX;
    let x;

    grabSlider.addEventListener(
        'mousedown',
        (e) => {
            pressed = true;
            startX = e.offsetX - innerGrabSlider.offsetLeft;
            grabSlider.style.cursor = 'grabbing';
        }
    )

    grabSlider.addEventListener(
        'mouseenter',
        () => {
            grabSlider.style.cursor = 'grab';
        }
    )

    grabSlider.addEventListener(
        'mouseup',
        () => {
            grabSlider.style.cursor = 'grab';
        }
    )

    window.addEventListener(
        'mouseup',
        () => {
            pressed = false;
        }
    )

    grabSlider.addEventListener(
        'mousemove',
        (e) => {
            if (!pressed) return;
            e.preventDefault();

            sliderContainer.setAttribute('disabled', 'true');

            stack.setAttribute('disabled', 'true');

            x = e.offsetX

            innerGrabSlider.style.left = x - startX + 'px';

            checkEndOfPage();
        }
    )

    checkEndOfPage = () => {
        let outer = grabSlider.getBoundingClientRect().right;

        let inner = innerGrabSlider.getBoundingClientRect().right;

        if (parseInt(innerGrabSlider.style.left) > 0) {
            innerGrabSlider.style.left = '0px';
            console.log(innerGrabSlider.style.right)
            sliderContainer.removeAttribute('disabled');
            stack.removeAttribute('disabled');
        }
        else if (inner.right < outer.right) {
            innerGrabSlider.style.left = '-' + inner.width - outer.width + 10 + 'px'
        }
    }
}
dragSlide();

// video display

videoDisplay.onclick = (e) => {
    e.preventDefault();
    displayVideo.classList.add("show");
}

displayVideo.onclick = () => {
    displayVideo.classList.remove("show");
}

// contact modal

for (let i = 0; i < contactDisplay.length; i++) {
    contactDisplay[i].onclick = (e) => {
        e.preventDefault();
        if (contactDisplay[1]) {
            toggleHamm();
        }
        displayModal.classList.add('show');
    }
}

close.onclick = (e) => {
    e.preventDefault();
    displayModal.classList.remove('show');
}

// split text footer

const text = document.querySelector('.text')
const strText = text.textContent;
const splitText = strText.split('');
text.textContent = ''

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + '</span>';
}

let char = 0;

const onTick = () => {
    let span = text.querySelectorAll('footer span')[char];
    span.classList.add('fade');
    char++;
    if (char === splitText.length) {
        complete();
        return;
    }
}

let timer = setInterval(onTick, 200);

const complete = () => {
    clearInterval(timer);
    timer = null;
}

// certification slider

let counter = 1;

setInterval(
    () => {
        let radio = document.getElementById('radio' + counter)
        let label = radio.querySelector('.manual-btn');
        radio.checked = true;

        counter++;
        if (counter > 3) {
            counter = 1;
        }
    }, 3000
);


// this logic acts like an ajax 
//this section holds code modals for homepage, profile and interests.  

for (let i = 0; i < profile.length; i++) {
    profile[i].onclick = (e) => {
        e.preventDefault();
        if (profile[1]) {
            toggleHamm();
        }
        root.innerHTML = profileDisplay;
        profileDisplay.style.display = 'block';
        projectDisplay.style.display = 'none';
    }

}

for (let i = 0; i < project.length; i++) {
    project[i].onclick = (e) => {
        e.preventDefault();
        if (project[1]) {
            toggleHamm();
        }
        root.innerHTML = projectDisplay;
        projectDisplay.style.display = 'flex';
        profileDisplay.style.display = 'none';
    }
}