const { app, BrowserWindow, Menu, dialog, clipboard } = require('electron')
const path = require('path')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: '文件',
    submenu: [
      isMac ? {label:'关闭', role: 'close' } : { label:'关闭', role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: '编辑',
    submenu: [
      { label:'撤消', role: 'undo' },
      { label:'恢复', role: 'redo' },
      { type: 'separator' },
      { label:'剪切', role: 'cut' },
      { label:'复制', role: 'copy' },
      { label:'粘贴', role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { label:'删除', role: 'delete' },
        { type: 'separator' },
        { label:'全选', role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: '视图',
    submenu: [
      { label:'加载', role: 'reload' },
      { label:'强制加载', role: 'forceReload' },
      { label:'开发者工具', role: 'toggleDevTools' },
      { type: 'separator' },
      { label:'还原', role: 'resetZoom' },
      { label:'放大', role: 'zoomIn' },
      { label:'缩小', role: 'zoomOut' },
      { type: 'separator' },
      { label:'全屏', role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: '窗口',
    submenu: [
      { label:'最小化', role: 'minimize' },
      { label:'缩放', role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { label:'关闭', role: 'close' }
      ])
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: 'QQ群',
        click: async () => {
          dialog.showMessageBox({
		    message: '群号：159318834', 
			title:'QQ群', 
		    type: 'question', 
			detail:'加群请注明来意，进群后请注意保护个人隐私并更改昵称 班级+姓名。',
			buttons:['复制群号','取消']
		  }).then((result)=>{
				if(result.response==0){
				   clipboard.writeText('159318834')
				   dialog.showMessageBox({
					  message: '已复制', 
					  title:'复制群号', 
					  type: 'info'
				   })
				}
		  }).catch((error)=>{
			  console.log(error);
		  })
        }
      },
	  { type: 'separator' },
	  {
        label: '关于',
        click: async () => {
          dialog.showMessageBox({
		    message: 'Z.核校园应用程序 版本: V1.0.0', 
			title:'关于', 
		    type: 'info', 
			detail:'Z.核校园是由昆工城市学院教师及学生，于2016年共同发起的开源项目，旨在帮助教师及学生更便捷，高效的完成工作和学习。若您也对教育方面有兴趣，可关注或加入我们。'
		  })
        }
      },
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  const win = new BrowserWindow({
	  icon: path.join(__dirname, '/static/logo.ico'),
	  show: false
	  })
  win.maximize()
  win.show()
  win.loadURL('https://www.zbeboy.top')
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})