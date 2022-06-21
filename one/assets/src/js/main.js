import $ from 'jquery'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/modal'
import Modal from './components/Modal'

document.addEventListener('DOMContentLoaded', () => {

  let $modal = $('.modal')
  if ($modal.length) {
    const modal = new Modal($modal)
    modal.init()
  }

})
