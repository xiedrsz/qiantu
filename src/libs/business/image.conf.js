module.exports = {
  '101': {
    code: '101',
    type: 'idCard', // F
    cname: '身份证',
    ename: 'ID CARD',
    finished: false,
    class: 'idCard',
    maxLen: 1,
    imageList: [{
      fileType: "idProFile",
      img: "",
      prompt: "身份证正面",
      isUpload: false
    }, {
      fileType: "idConFile",
      img: "",
      prompt: "身份证反面",
      isUpload: false
    }],
    mess: '身份证尚未上传'
  },
  '102': {
    code: '102',
    type: 'work',
    cname: '工作证明',
    ename: 'WORK CERIFICATE',
    finished: false,
    class: 'idJob',
    maxLen: 2,
    imageList: [{
      fileType: "jobFile",
      img: "",
      prompt: "工作证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '工作证明尚未上传'
  },
  '10301': {
    code: '10301',
    type: 'income',
    cname: '收入证明',
    ename: 'INCOME CERIFICATE',
    finished: false,
    class: 'idIncome',
    maxLen: 2,
    imageList: [{
      fileType: "incomeFile",
      img: "",
      prompt: "收入证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '收入证明尚未上传'
  },
  '10302': {
    code: '10302',
    type: 'payroll',
    cname: '工资流水',
    ename: 'PAYROLL CERIFICATE',
    finished: false,
    class: 'idPayroll',
    maxLen: 10,
    imageList: [{
      fileType: "payRollFile",
      img: "",
      prompt: "工资流水",
      isUpload: false,
      positionNo: 0
    }],
    mess: '工资流水尚未上传'
  },
  '105': {
    code: '105',
    type: 'marry',
    cname: '结婚证明',
    ename: 'MARRIAGE CERIFICATE',
    finished: false,
    class: 'idMarriage',
    maxLen: 2,
    imageList: [{
      fileType: "marryFile",
      img: "",
      prompt: "结婚证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '结婚证明尚未上传'
  },
  '10601': {
    code: '10601',
    type: 'provident',
    cname: '公积金流水证明',
    ename: 'PROVIDENT FUND CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "providentFile",
      img: "",
      prompt: "公积金流水",
      isUpload: false,
      positionNo: 0
    }],
    mess: '公积金流水证明尚未上传'
  },
  '10602': {
    code: '10602',
    type: 'providentAccount',
    cname: '公积金账户信息证明',
    ename: 'PROVIDENT FUND CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "providentAccountFile",
      img: "",
      prompt: "公积金账户信息",
      isUpload: false,
      positionNo: 0
    }],
    mess: '公积金账户信息证明尚未上传'
  },
  '107': {
    code: '107',
    type: 'house',
    cname: '房产证明',
    ename: 'RELEVANT CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "houseFile",
      img: "",
      prompt: "房产证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '房产证明尚未上传'
  },
  '10801': {
    code: '10801',
    type: 'business',
    cname: '营业执照',
    ename: 'BUSINESS CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "businessFile",
      img: "",
      prompt: "营业执照",
      isUpload: false,
      positionNo: 0
    }],
    mess: '营业执照尚未上传'
  },
  '10802': {
    code: '10802',
    type: 'holding',
    cname: '持股证明',
    ename: 'HOLDING CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "holdingFile",
      img: "",
      prompt: "持股证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '持股证明尚未上传'
  },
  '10901': {
    code: '10901',
    type: 'property',
    cname: '公司账单流水',
    ename: 'COMPANY BILLS',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "propertyFile",
      img: "",
      prompt: "公司账单流水",
      isUpload: false,
      positionNo: 0
    }],
    mess: '公司或个人账单流水上传'
  },
  '10902': {
    code: '10902',
    type: 'companybills',
    cname: '个人账单流水',
    ename: 'PERSONAL BILLS',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "companyBillsFile",
      img: "",
      prompt: "个人账单流水",
      isUpload: false,
      positionNo: 0
    }],
    mess: '公司或个人账单流水上传'
  },
  '110': {
    code: '110',
    type: 'live',
    cname: '居住证明',
    ename: 'RESIDENCE CERIFICATE',
    finished: false,
    class: 'icon-com icon-address',
    maxLen: 2,
    imageList: [{
      fileType: "liveFile",
      img: "",
      prompt: "居住证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '居住证明尚未上传'
  },
  '111': {
    code: '111',
    type: 'other',
    cname: '其他资料',
    ename: 'OTHER CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "otherFile ",
      img: "",
      prompt: "其他证明",
      isUpload: false,
      positionNo: 0
    }],
    mess: '其他资料尚未上传'
  },
  '11201': {
    code: '11201',
    type: 'family',
    cname: '家访照片',
    ename: 'VISITING PHOTO',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "familyFile ",
      img: "",
      prompt: "家访照片",
      isUpload: false,
      positionNo: 0
    }],
    mess: '家访照片或其他增信材料尚未上传'
  },
  '11202': {
    code: '11202',
    type: 'materials',
    cname: '其他增信材料',
    ename: 'INCREMENTAL CREDIT CERIFICATE',
    finished: false,
    class: 'icon-com icon-same',
    maxLen: 2,
    imageList: [{
      fileType: "materialsFile ",
      img: "",
      prompt: "其他增信材料",
      isUpload: false,
      positionNo: 0
    }],
    mess: '家访照片或其他增信材料尚未上传'
  }
}