module.exports = {
  devServer: {
    port: 58090,
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'cn.blueArchive.lib',
        productName: 'Moletalk——跨越世界，记录生活',
        mac: {
          icon: 'icons/icon.icns',
          artifactName: 'balib-mac-v${version}.${ext}',
          target: ['dmg'],
        },
        win: {
          icon: 'icons/256x256.png',
          artifactName: 'balib-win64-v${version}.${ext}',
          target: [{ target: '7z', arch: ['x64'] }],
        },
        extraResources: [
          'prisma/**/*',
          'node_modules/.prisma/**/*',
          'node_modules/@prisma/client/**/*',
        ],
      },
      externals: ['@prisma/client'],
      nodeIntegration: true,
    },
  },
};
