<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人资料"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
     title="头像"
     is-link
    >
      <van-image
       width="30"
       height="30"
       round
       fit="fill"
       :src="user.photo"
      />
    </van-cell>
    <van-cell
     title="昵称"
     is-link
     :value="user.name"
     @click="isEditNameShow = true"
    />
    <van-cell
     title="性别"
     is-link
     :value="user.gender === 0 ? '男' : '女'"
     @click="isEditGenderShow = true"
    />
    <van-cell
     title="生日"
     is-link
     :value="user.birthday"
     @click="isEditBirthdayShow = true"
    />
    <!-- FIXME:修改昵称弹出层 -->
    <van-popup
     class="edit-name"
     v-model="isEditNameShow"
     position="bottom"
     :style="{ height: '100%' }"
    >
      <edit-name
      v-if="isEditNameShow"
       @close="isEditNameShow = false"
       v-model="user.name"
      />
    </van-popup>
    <!-- /修改昵称弹出层 -->
    <!-- FIXME:修改用户性别 -->
    <van-popup
     class="edit-name"
     v-model="isEditGenderShow"
     position="bottom"
    >
      <edit-gender
       @close="isEditGenderShow = false"
       v-model="user.gender"
      />
    </van-popup>
    <!-- /修改用户性别 -->

    <!-- FIXME:修改用户生日 -->
    <van-popup
     class="edit-name"
     v-model="isEditBirthdayShow"
     position="bottom"
    >
      <edit-birthday
       @close="isEditBirthdayShow = false"
       v-model="user.birthday"
      />
    </van-popup>
    <!-- /修改用户生日 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/edit-name'
import EditGender from './components/edit-gender'
import EditBirthday from './components/edit-birthday'
export default {
  name: 'UpdateProfile',
  components: {
    EditName,
    EditGender,
    EditBirthday
  },
  data () {
    return {
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      user: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style scoped lang="less">
.edit-name {
  background-color: #ccc;
}
</style>
