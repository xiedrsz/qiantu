/**
 * 影像系统业务处理表
 * xiedrsz
 */

import Vue from 'vue'

import imageConf from "../libs/business/image.conf"

let imageTB = {}

/**
 * 参数
 * @Param supplyMaterialCode string 必传资料
 */
imageTB.param = {
  supplyMaterialCode: "101,102,10301,10302"
}

/**
 * 上传文件列表
 */
imageTB.param.lists = []

/**
 * 设置参数
 * @Param item string 字段名
 * @Param value 字段的值
 */
imageTB.setParam = (item, value) => {
  console.log(value)
  imageTB.param[item] = value
  return this
}

/**
 * @Function 初始化列表
 * @Param codeStrs code 字符串
 */
imageTB.initList = (codeStrs) => {
  var codeStrs = codeStrs || imageTB.param.supplyMaterialCode
  let codes = codeStrs.split(","),
    tmp;

  codes.forEach((item) => {
    tmp = imageConf[item];
    !!tmp && imageTB.param.lists.push(tmp)
    tmp = {}
  })
}

/**
 * @Function 添加图片
 * @Param item object 被添加图片对象
 * @Param opt object 选项 [可选]
 */
imageTB.addImage = (item, opt) => {
  if (item.maxLen == 1) {
    return false
  }

  let option = opt || {},
    fileType = item.imageList[0].fileType,
    len = item.imageList.length,
    prompt = option.prompt || item.cname,
    isUpload = option.isUpload || false

  if (len >= item.maxLen) {
    return false
  }

  item.imageList.push({
    fileType: fileType,
    img: "",
    prompt: prompt,
    isUpload: isUpload,
    positionNo: len
  })

  return true
}



/**
 * @Function 上传影像
 * @Param curImage 当前图片
 * @Param callback 成功回调
 */
imageTB.upImage = (curImage, callback) => {
  let option = {
      orderId: '543',
      commissionerUm: 'test007',
      uploadConfig: curImage.maxLen > 1
    },
    fileType

  if (curImage.maxLen > 1) { // 多张
    if (!curImage.imageList[0].img) {
      // 提示
      return
    }
    curImage.imageList.forEach((imageItem) => {
      if (!imageItem.img) {
        return
      }

      fileType = imageItem.fileType
      option.positionNo = imageItem.positionNo || 0
      option[fileType] = imageItem.img
      Vue.http.post('/vfsales/application/upload_image', option).then((data) => {
        console.log(data)

        curImage.finished = true

          !!callback && callback(data)
      }, function (e) {
        console.error(e)
      })
    })
  } else { // 单张
    option.positionNo = 0
    let post = true
    curImage.imageList.forEach((imageItem) => {
      if (!imageItem.img) {
        // 提示
        post = false
        return
      }

      fileType = imageItem.fileType
      option[fileType] = imageItem.img
    })

    if (!post) return
    Vue.http.post('/vfsales/application/upload_image', option).then((data) => {
      console.log(data)
      curImage.finished = true
      console.log("dan");
      !!callback && callback(data)
    }, function (e) {
      console.error(e)
    })
  }
}

/**
 * @Function 
 * @Param request 请求
 * @Param callback 成功回调
 */
imageTB.getImageInfo = (request, callback) => {
  Vue.http.post('/vf_sales/order/imageInfo', {
    orderId: '543'
  }).then((data) => {
    console.log(data)

    let lists = data.data.imageJson || '[]',
      uploaded = {}
    lists = JSON.parse(lists)
    lists.forEach((item) => {
      let attachType = item.attachType
      if (!!uploaded[attachType]) {
        uploaded[attachType]++
      } else {
        uploaded[attachType] = 1
      }
    })

    imageTB.updateList(uploaded)
    console.log(uploaded)

    !!callback && callback(res)
  }, function (e) {
    console.error(e)
  })
}

/**
 * @Function 更新列表
 * @Param uploaded object 已上传对象
 */
imageTB.updateList = (uploaded) => {
  imageTB.param.lists.forEach((item) => {
    let code = item.code,
      len = uploaded[code],
      maxLen = item.maxLen

    if (len) {
      item.finished = true

      if (maxLen == 1) { // 单张
        item.imageList.forEach((it) => {
          it.isUpload = true
        })
      } else {
        item.imageList[0].isUpload = true

        while (len > 1) {
          imageTB.addImage(item, {
            isUpload: true
          })
          len--
        }

        imageTB.addImage(item)
      }
    }
  })
}

/**
 * @Function 影像资料更新
 * @Param request 请求
 * @Param callback 成功回调
 */
imageTB.updateImage = (request, callback) => {

  Vue.http.get('/expense/pull').then(function (data) {
    console.log(data)

    !!callback && callback(lists)
  }, function (e) {
    console.error(e)
  })
}

module.exports = imageTB