import $ from 'jquery'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/modal'
import Modal from './components/Modal'
import TypeWriter from './components/TypeWriter'

document.addEventListener('DOMContentLoaded', () => {

  let $modal = $('.modal')
  if ($modal.length) {
    const modal = new Modal($modal)
    modal.init()
  }

  let $textContainer = $('.page-heading__text__highlight')
  if ($textContainer.length) {
    const typewriter = new TypeWriter($textContainer)
    typewriter.init()
  }

})
