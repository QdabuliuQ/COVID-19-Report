<template>
  <div id="boxBackground">
    <div class="clip_left clip_container"></div>
    <div class="clip_right clip_container"></div>
  </div>
</template>

<script>
export default {
  name: 'boxBackground'
}

</script>
<style scoped>
#boxBackground{
  width: 100%;
  height: 100%;
  position: absolute;
}
.clip_container {
  position: absolute;
}
.clip_left {
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  background-color: var(--color);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.clip_right {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #4f5d73;
}
</style>