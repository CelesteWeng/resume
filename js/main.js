var aTags = document.querySelectorAll('#menu > ul > li > a')
var liTags = document.querySelectorAll('#menu > ul > li')
var displayTags = document.querySelectorAll('[data-show]')

for (let i = 0; i < displayTags.length; i++) {
  displayTags[i].classList.add('sinking')
}

findClosest()
window.onscroll = (x) => {
  // 导航栏 sticky
  !!document.documentElement.scrollTop ? topNavBar.classList.add('sticky') : (topNavBar.className = 'topNavBar')
  findClosest()
}

// 点击导航栏缓动
for (let i = 0; i < liTags.length; i++) {
  liTags[i].onclick = (evt) => {
    let href = evt.target.firstElementChild.getAttribute('href')
    if (href.length === 1) return
    let currentTop = document.documentElement.scrollTop
    let targetTop = document.querySelector(evt.target.firstElementChild.getAttribute('href')).offsetTop - 80
    let s = Math.abs(targetTop - currentTop)
    // let s = Math.abs(document.querySelector(evt.target.firstElementChild.getAttribute('href')).getBoundingClientRect().top - 80)
    let t = (s / 100) * 300 > 500 ? 500 : (s / 100) * 300

    var coords = { y: currentTop }
    var tween = new TWEEN.Tween(coords)
      .to({ y: targetTop }, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        window.scrollTo(0, coords.y)
      })
      .start()
  }
}
function animate(time) {
  requestAnimationFrame(animate)
  TWEEN.update(time)
}
requestAnimationFrame(animate)

// 查找目前浏览的板块
function findClosest() {
  let minIndex = 0
  let tagId = ''
  // addClassSinking()
  for (let i = 0; i < displayTags.length; i++) {
    displayTags[i]._s = Math.abs(displayTags[i].getBoundingClientRect().top)
    if (displayTags[i]._s < displayTags[minIndex]._s) {
      minIndex = i
    }
  }
  tagId = `#${displayTags[minIndex].getAttribute('id')}`
  setTimeout(() => {
    displayTags[minIndex].classList.remove('sinking')
  }, 100)
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].className = 'navLi'
  }
  document.querySelector(`a[href="${tagId}"]`).parentNode.classList.add('highlight')
}

// function addClassSinking() {
//   for (let i = 0; i < displayTags.length; i++) {
//     console.log(displayTags[i].className)
//     if (!displayTags[i].className.split(' ').includes('sinking')) {
//       displayTags[i].classList.add('sinking')
//       console.log(displayTags[i].classList)
//     }
//   }
// }