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

window.switch_filter = (category) => {
  $('a.active').removeClass('active')
  $('[data-r-selector="'+category+'"]').addClass('active')
  if (category === 'all') {
    $('[data-r-type="paper"]').show()
    $('[data-r-type="tutorial"]').show()
    $('[data-r-type="video"]').show()
  } else {
    $('[data-r-type="paper"]').hide()
    $('[data-r-type="tutorial"]').hide()
    $('[data-r-type="video"]').hide()
    $('[data-r-type="'+category+'"]').show()
  }
}