import $ from 'jquery'

export default class Modal {
  constructor($modal) {
    this.$modal = $modal
    this.$modalDialog = this.$modal.find('.modal-dialog')
  }

  init() {
    const $modalBody = this.$modal.find('.modal-body')
    this.$modal[0].addEventListener('show.bs.modal', (e) => {
      const $trigger = $(e.relatedTarget)
      const videoAspectRatio = $trigger.data().videoAspectRatio
      const videoId = $trigger.data().videoId
      let embedString = `<div class="ratio ratio-${videoAspectRatio}">`
      embedString += `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      embedString += '</div>'
      $modalBody.html(embedString)
      // Use a smaller modal for square or 4x3 aspect ratio videos
      this.$modalDialog.removeClass('modal-lg modal-xl')
      if (videoAspectRatio === '1x1' || videoAspectRatio === '4x3') {
        this.$modalDialog.addClass('modal-lg')
      } else {
        this.$modalDialog.addClass('modal-xl')
      }
    })
    this.$modal[0].addEventListener('hidden.bs.modal', () => {
      $modalBody.html('')
    })
  }
}
