const socialIconButtons = document.getElementsByClassName("social-icon");

function postToSocialMedia(classList) {
    const content = `Check out my cool generative AI Project 😎 \n${window.location.href.toString()}`;
    if (classList.contains("twitter")) {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
        window.open(url);
    } else if (classList.contains("linkedin")) {
        const url = `https://www.linkedin.com/share?text=${encodeURIComponent(content)}`;
        window.open(url);
    } else if (classList.contains("whatsapp")) {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(content)}`);
    }
}

const addEventListenersToSocialIconButton = () => {
    for (let i = 0; i < socialIconButtons.length; i++) {
        socialIconButtons[i].addEventListener("click", () =>
            postToSocialMedia(socialIconButtons[i].classList)
        );
    }
};

addEventListenersToSocialIconButton();

const skillIcon = document.getElementsByClassName("tooltip1");

const addEventListenersToSkillIcon = () => {
    for (let i = 0; i < skillIcon.length; i++) {
        skillIcon[i].addEventListener("click", (e) => {
            console.log(e.target)
            updateDescription(e.target.id);
        });
    }
};

addEventListenersToSkillIcon();

const descriptionDiv = document.getElementsByClassName("about-section");

document.addEventListener('DOMContentLoaded', function() {
    var openPageButton = document.getElementById('openPageButton');
    openPageButton.addEventListener('click', function() {
        window.location.href = 'another-page.html';
    });
});

let sections = document.querySelectorAll('[id^="main"]');

if (sections.length > 1) {
    let sectionOne = sections[0];
    sections.forEach((section) => {
        if (section != sectionOne) {
            $(section).css('cssText', 'display: none !important;');
        }
    });
}



const makeRemainingScreensInvisible = (main) => {
    let sections = document.querySelectorAll('[id^="main"]');
    sections.forEach((section) => {
        if ($(section).attr("id") != main) {
            $(section).css('cssText', 'display: none !important;');
        }
    });
};
const display = (main) => {
    makeRemainingScreensInvisible(main);
    let section = document.getElementById(main);
    $(section).css('cssText', '');
    window.scrollTo(0, 0);
};