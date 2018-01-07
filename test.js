const mTemplate = require('./index');
/**
 * ----------------------------------------
 * 暂不支持创建多个页面同时创建
 * replaceName  为输入的文件夹的名字
 * ----------------------------------------
 */
var ary = [
  {
    path: process.cwd() + '/src',
    template: `<template>
    <div id="replaceName" lang="html">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'replaceName',
  components: {}
}
</script>

<style lang="scss">
</style>
`
  }
]
mTemplate(ary)