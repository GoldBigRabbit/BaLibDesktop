const editorList = ['阿拉萨德', '颅献黄铜马桶'];

const staffList = [
  '阿拉萨德',
  '仓鼠',
  '墨鱼佬',
  '没吃蘑菇',
  '金色大只兔',
  '爆弹猫猫',
  '狂暴挖坑鹰',
  '颅献黄铜马桶',
].filter((v, i, l) => {
  return l.indexOf(v) === i;
});

module.exports = {
  editors: editorList,
  elTagTypes: ['info', '', 'warning', 'success', 'danger'],
  signInfo: {
    content: '开发：风之低吟 | 版本：0.0.1',
    pubKey:
      '04b22adb255151b0ee6edc5ca38557e54689c786a91fefcbda4b2a36a004dc594aae5fadccd740a06b2d79e38458622ec41688c1106f365404beb7ab43c3ee2f72',
    sign:
      '3045022100c8832c99a9c25261c542a5c46861e5957265d8c1f5b7affa28f337a900038dee02207601b6f4ca2fd5dadcde9e3a7c743ed012665b396de53a1b923f9ef086aaf281',
  },
  staffs: staffList,
  tagTypes: ['其他', '角色', '系列', '长篇/合集', '争议/不适'],
};
