import "../styles/style.scss"

let position = 0
let countShowSlides = 4
let scrollSlides = 1
const slider = document.querySelector(".slider")
const sliderList = slider.querySelector(".slider__content")
const slides = slider.querySelectorAll(".slider__slide")
const arrowLeft = document.querySelector(".slider-arrow_left")
const arrowRight = document.querySelector(".slider-arrow_right")
const widthSlide = slider.clientWidth / countShowSlides
let distanceToScroll = widthSlide * scrollSlides

slides.forEach(slide => {
    slide.style.minWidth = widthSlide + "px"
})

arrowLeft.addEventListener("click", (e) => {
    swipeLeft()
})

arrowRight.addEventListener("click", (e) => {
    swipeRight()
})

const swipeLeft = () => {
    if (position == 0) {
        position = -(slides.length - countShowSlides) * widthSlide
    } else {
        position += distanceToScroll
    }

    sliderList.style.transform = `translateX(${position}px)`
}

const swipeRight = () => {
    if (Math.abs(position) == (slides.length - countShowSlides) * widthSlide) {
        position = 0
    } else {
        position -= distanceToScroll
    }

    sliderList.style.transform = `translateX(${position}px)`
}
