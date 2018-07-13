<template>
  <div class="i-layout">
      <div class="grayLayout" v-if="gray">
        <slot name="grayLayout"></slot>
      </div>
      <!-- <div class="tableHead" v-if="head">
        <slot name="tableHead"></slot>
      </div> -->
      <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    gray: {
      type: Boolean,
      default: false
    },
    head: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.i-layout{
    // width: 95%;
    background-color: #ffffff;
    border: 1px solid #797979;
    border-radius: 15px;
    margin-bottom: 50px;
    margin-top: 20px;
    padding: 25px;
    .grayLayout {
        // width: 100%;
        background-color: #f2f2f2;
        border-radius: 10px 10px 0 0;
        padding: 10px;
    }
    .tableHead {
        // width: 100%;
        background-color: #d7d7d7;
        padding: 5px;
    }
}
</style>
