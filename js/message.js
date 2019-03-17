!function () {
  var model = {
    // 获取数据
    init: function () {
      var APP_ID = 'bLOgg5wSNPq8TW1wfl0JzzRh-gzGzoHsz'
      var APP_KEY = 'YywUOutRy2HRhcoBnYW8eQ8G'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function () {
      var query = new AV.Query('Message')
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function (name, content) {
      var Message = AV.Object.extend('Message')
      var message = new Message()
      return message.save({ // Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('section.message')

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function() {
      this.model.fetch().then((messages) => {
        let newArr = messages.map(t => t.attributes)
        newArr.forEach(t => {
          let li = document.createElement('li')
          li.innerText = `${t.name}: ${t.content}`
          this.messageList.appendChild(li)
        })
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let name = view.querySelector('input[name=name]').value
      let content = view.querySelector('input[name=content]').value
      
      if(name === '' || content === '') {
        return alert(`请输入${name === '' ? '姓名' : '内容'}`)
      }

      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        this.messageList.appendChild(li)
        this.view.querySelector('input[name=content]').value = ''
      })
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage()
      })
    }
  }

  controller.init(view, model)

}.call()