!function(){
  var view = document.querySelector('#topNavBar')

  var controller = {
    view: null,
    init: function(view) {
      this.view = view
      this.bindEvents()
      // this.bindEvents.call(this)
    },
    bindEvents: function() {
      window.addEventListener('scroll', (e) => {
        this.activeEnabled(!!window.scrollY)
        // 1. 函数内 this 为触发事件的元素，使用 function(){} 需要绑定 this
        //    function(){}.bind(this)
        // 2. 使用箭头函数。箭头函数没有 this，没有箭头函数的内外 this 是一样的
      })
    },
    activeEnabled: function(enabled) {
      enabled ? this.view.classList.add('sticky') : this.view.classList.remove('sticky')
    }
  }
  controller.init(view)
  // controller.init.call(controller, view)
}.call()