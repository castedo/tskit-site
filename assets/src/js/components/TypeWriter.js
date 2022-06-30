import $ from 'jquery'
import {gsap} from "gsap";

export default class TypeWriter {
  constructor($textContainer) {
    this.textContainer = $textContainer[0]
    // PLEASE NOTE!: If you change these words, the CSS and JS governing their position and wrapping will need to
    // be re-calculated. See _page-heading.scss: .js section in .page-heading__text class.
    // Enough height must be given to .page-heading__text at each breakpoint so that the page doesn't jump around
    // when the TypeWriter effect makes the heading wrap to a new line.
    this.words = [
      'Population-scale',
      'Efficient',
      'Open-source',
      // 'Low-carbon',
      'Developer-friendly',
      'Rock-solid',
      'Reproducible',
      'Reusable',
      'Community-built',
    ];
    this.currentWord = 1
    this.startingDelay = 1.5
    this.endingDelay = 3.5
  }

  init() {
    this.textContainer.innerHTML = this.words[0]
    gsap.delayedCall(this.endingDelay, () => {
      this.animateWord(this.words[this.currentWord].length)
    })
  }

  animateWord(target_value) {
    this.textContainer.style.paddingLeft = '0'
    this.textContainer.style.paddingRight = '0'
    this.textContainer.innerHTML = ''
    let tweenObject = {
      valueToTween: 0
    };
    gsap.to(tweenObject, {
      // Animation speed based on text length, 16 characters will take 2 seconds to animate in fully
      duration: 0.125 * target_value,
      delay: this.startingDelay,
      valueToTween: target_value,
      ease: 'none',
      onStart: () => {
        this.textContainer.style.paddingLeft = '0.25em'
        this.textContainer.style.paddingRight = '0.25em'
      },
      onUpdate: () => {
        // SAFARI RAGE!
        // Because this.textContainer has top and bottom padding, Safari isn't rendering the green background properly
        // around each new letter as it appears. Have tried will-change to force re-rendering, to no avail.
        // So bodge it by applying then reverting inline-block and a scale transformation. Seems to work ok. Grrrrrr.
        this.textContainer.style.display = 'inline-block'
        this.textContainer.style.transform = 'scale(0.9)'
        this.textContainer.innerHTML = this.words[this.currentWord].slice(0, tweenObject.valueToTween.toFixed(0))
        this.textContainer.style.transform = 'scale(1)'
        this.textContainer.style.display = 'inline'
      },
      onComplete: () => {
        if (this.currentWord === this.words.length - 1) {
          this.currentWord = 0
        } else {
          this.currentWord++
        }
        gsap.delayedCall(this.endingDelay, () => {
          this.animateWord(this.words[this.currentWord].length)
        })
      }
    });
  }

}
