import "../styles/style.scss"

// options
let countShowSlides = 4
let scrollSlides = 2
let spaceBetween = 40

// helpers
let position = 0
let currentSlide = 0
let currentScroll = 0

// slider
const slider = document.querySelector(".slider")
const sliderList = slider.querySelector(".slider__content")
const slides = slider.querySelectorAll(".slider__slide")
const slidesCount = slides.length
const arrowLeft = document.querySelector(".slider-arrow_left")
const arrowRight = document.querySelector(".slider-arrow_right")
const progressBar = document.querySelector(".slider-bar__fill")

// calced values
const widthSlide = slider.clientWidth / countShowSlides
const widthSlideWithSpaceBetween = widthSlide + spaceBetween / countShowSlides
const distanceToScroll = widthSlideWithSpaceBetween * scrollSlides
let countScrolls = Math.ceil((slidesCount - countShowSlides) / scrollSlides)

progressBar.style.width = currentScroll * (100 / countScrolls) + "%"

slides.forEach(slide => {
    slide.style.minWidth = widthSlide - (spaceBetween - spaceBetween / countShowSlides) + "px"
    slide.style.marginRight = spaceBetween + "px"
})

arrowLeft.addEventListener("click", (e) => {
    swipeLeft()
})

arrowRight.addEventListener("click", (e) => {
    swipeRight()
})

const swipeLeft = () => {
    // если при перемещении влево осталось переместить меньше слайдов, чем в конфиге
    // то переместить в крайний левый край
    if (currentSlide < scrollSlides && currentSlide != 0) {
        currentSlide = 0
        position = 0
        currentScroll = 0
    // если слайдер в самом левом краю, то передвинуть в крайний правый
    } else if (currentSlide == 0) {
        position = -(slidesCount - countShowSlides) * widthSlideWithSpaceBetween
        currentSlide = slidesCount - countShowSlides
        currentScroll = countScrolls
    } else {
        position += distanceToScroll
        currentSlide -= scrollSlides
        currentScroll -= 1
    }

    updatePosition()
}

const swipeRight = () => {

    // если при перемещении вправо осталось переместить меньше слайдов,чем в конфиге и слайдер не находится в крайнем правом положении,
    // то переместить в крайний правый край
    const slidesLeft = slidesCount - countShowSlides - scrollSlides
    if (currentSlide > slidesLeft && currentSlide != slidesCount - countShowSlides) {
        position = -(slidesCount - countShowSlides) * widthSlideWithSpaceBetween
        currentSlide = slidesCount - countShowSlides
        currentScroll += 1
    // если слайдер в самом правом краю, то передвинуть в крайний левый
    } else if (currentSlide == slidesCount - countShowSlides) {
        position = 0
        currentSlide = 0
        currentScroll = 0
    } else {
        position -= distanceToScroll
        currentSlide += scrollSlides
        currentScroll += 1
    }

    updatePosition()
}

function updatePosition() {
    sliderList.style.transform = `translateX(${position}px)`
    progressBar.style.width = currentScroll * (100 / countScrolls) + "%"
}

