!function () {
  var view = document.querySelector('nav#menu')

  var controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.bindEvents()
    },
    initAnimation: function() {
      function animate(time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      requestAnimationFrame(animate)
    },
    scrollToElement: function (element) {
      let currentTop = window.scrollY
      let targetTop = element.offsetTop - 80
      let s = Math.abs(targetTop - currentTop)
      // let s = Math.abs(document.querySelector(evt.target.firstElementChild.getAttribute('href')).getBoundingClientRect().top - 80)
      let t = (s / 100) * 300 > 500 ? 500 : (s / 100) * 300

      var coords = { y: currentTop } 
      var tween = new TWEEN.Tween(coords) // 起始位置
        .to({ y: targetTop }, 500) // 结束位置 和 时间
        .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
        // coords.y 已经变了
        .onUpdate(() => {
          window.scrollTo(0, coords.y) // 如何更新界面
        })
        .start()
    },
    bindEvents: function () {
      // 点击导航栏缓动
      let liTags = document.querySelectorAll('#menu > ul > li')
      for (let i = 0; i < liTags.length; i++) {
        liTags[i].onclick = (evt) => {
          let href = evt.target.firstElementChild.getAttribute('href')
          if (href.length === 1) return
          this.scrollToElement(document.querySelector(href))
        }
      }
    }

  }

  controller.init(view)

}.call()