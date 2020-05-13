<template>
  <!-- <div class="articleItem">{{article.title}}</div> -->
  <van-cell
  title="单元格"
  >
  <!-- 文章标题 -->
  <div slot="title" class="article-title van-multi-ellipsis--l3">{{article.title}}</div>
  <div slot="label">
    <!-- 有三个头像的时候显示 -->
    <div class="cover-wrap" v-if="article.cover.type === 3">
      <div
      class="cover-wrap-item"
      v-for="(item, index) in article.cover.images"
      :key="index"
      >
      <van-image
        class="right-cover"
        fit="cover"
        :src="item"
      />
      </div>
    </div>
    <!-- 文章作者什么的 -->
    <div class="label-wrap">
      <span>{{article.aut_name}}</span>
      <span>{{article.comm_count}}评论</span>
      <span>{{article.pubdate | relativeTime}}</span>
    </div>
  </div>
  <!-- 只有一个头像的时候显示 -->
  <van-image
    v-if="article.cover.type === 1"
    class="right-cover"
    fit="cover"
    :src="article.cover.images[0]"
  />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-title {
  font-size: 16px;
}
.cover-wrap {
  display: flex;
  padding: 15px 0;
  height: 73px;
  .cover-wrap-item {
    flex: 1;
    height: 73px;
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
}
.label-wrap {
  position: absolute;
  bottom: 2px;
  span {
    margin-right: 12px;
    font-size: 12px;
  }
}
.right-cover {
  width: 116px;
  height: 73px;
}
/deep/ .van-cell__value {
  flex: unset;
  width: 116px;
  height: 73px;
  margin-left: 10px;
}
</style>
