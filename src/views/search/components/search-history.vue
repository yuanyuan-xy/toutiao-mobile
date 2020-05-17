<template>
  <div class="searchHistory">
    <van-cell title="搜索历史">
      <div v-if="isDelShow">
        <span @click="$emit('delAllSearchHistory')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelShow=false">完成</span>
      </div>
      <div v-else>
        <van-icon name="clear" @click="isDelShow=true"/>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
    >
    <span slot="title" @click="$emit('search', item)">{{item}}</span>
    <van-icon @click="$emit('delHistory', index)" :name="isDelShow ? 'clear' : ''"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  name: 'SearchHistory',
  data () {
    return {
      isDelShow: false
    }
  }
}
</script>

<style>

</style>
