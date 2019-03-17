!function () {
  var view = document.body

  var controller = {
    view: null,
    displayTags: null,
    init: function (view) {
      this.view = view
      this.displayTags = this.view.querySelectorAll('[data-show]')
      this.addClassSinking()
      this.findClosestAndRemoveSinking()
      this.bindEvents()
    },
    addClassSinking: function () {
      let displayTags = this.displayTags
      for (let i = 0; i < displayTags.length; i++) {
        displayTags[i].classList.add('sinking')
      }
    },
    getClosetElementAndTagId: function() {
      let displayTags = this.displayTags
      let minIndex = 0
      let tagId = ''
      for (let i = 0; i < displayTags.length; i++) {
        displayTags[i]._s = Math.abs(displayTags[i].getBoundingClientRect().top)
        if (displayTags[i]._s < displayTags[minIndex]._s) {
          minIndex = i
        }
      }
      tagId = `#${displayTags[minIndex].getAttribute('id')}`
      let cloestElement = displayTags[minIndex]
      return { cloestElement, tagId }
    },
    findClosestAndRemoveSinking: function() {
      let { cloestElement, tagId } = this.getClosetElementAndTagId()
      this.removeClassSinking(cloestElement)
      this.initLiTagsClass(() => {
        this.addHighlight(tagId)
      })
    },
    removeClassSinking: function(element) {
      setTimeout(() => {
        element.classList.remove('sinking')
      }, 100)
    },
    initLiTagsClass: function(cb) {
      let liTags = this.view.querySelectorAll('#menu > ul > li')
      for (let i = 0; i < liTags.length; i++) {
        liTags[i].className = 'navLi'
      }
      cb && cb()
    },
    addHighlight: function(tagId) {
      this.view.querySelector(`a[href="${tagId}"]`).parentNode.classList.add('highlight')
    },
    bindEvents: function () {
      window.addEventListener('scroll', (e) => {
        this.findClosestAndRemoveSinking()
      })
    }

  }

  controller.init(view)
}.call()