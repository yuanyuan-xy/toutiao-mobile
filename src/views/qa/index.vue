<template>
  <div class="qa-container">
    <p>广告位招租</p>
    <p>联系人:<span class="uname">远远</span></p>
    <p>联系电话:176-1221-6832</p>
  </div>
</template>

<script>
export default {
  name: 'QaIndex'
}
</script>

<style scoped lang="less">
.qa-container {
  padding-top: 30px;
  font-size: 25px;
  text-align: center;
  color: orange;
  background: url('./01.jpg') no-repeat;
  background-size: cover;
  height: 100vh;
  .uname {
    color: #F8EFBA;
    font-size: 55px;
  }
}
</style>
