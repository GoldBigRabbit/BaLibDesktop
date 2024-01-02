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
    content: '开发：风之低吟 | 版本：3.0.0-Final',
    pubKey:
      '04f7c5d1bf43e06c4a119deb999c33a488fc38d1a7f6387cdc0001ed190d6b304846b3d2931fb15f819c6e57ac7ce119f8c68e376a5631d5ccfc1f712a51187123',
    sign:
      '3045022100c2ecb6ccc89e1997b0f570a653acc0d65f4f923640274eb023092f8bfbf5915202207a781316d6010b985fee6934344bc28d69f074516a4fa12936118894110a5e4d',
  },
  staffs: staffList,
  tagTypes: ['其他', '角色', '系列', '长篇/合集', '争议/不适'],
};
