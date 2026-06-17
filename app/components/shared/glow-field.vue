<template>
  <div aria-hidden="true" class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div class="contact-glow contact-glow--1" />
    <div class="contact-glow contact-glow--2" />
    <div class="contact-glow contact-glow--3" />
  </div>
</template>

<style scoped>
.contact-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
}

.contact-glow--1 {
  right: 8%;
  bottom: -10%;
  width: 38%;
  height: 70%;
  background: radial-gradient(circle at center,
    rgba(185, 212, 47, 0.28) 0%, rgba(185, 212, 47, 0.08) 45%, transparent 70%);
}

.contact-glow--2 {
  right: 28%;
  bottom: -18%;
  width: 30%;
  height: 60%;
  background: radial-gradient(circle at center,
    rgba(255, 139, 51, 0.24) 0%, rgba(255, 139, 51, 0.06) 45%, transparent 70%);
}

.contact-glow--3 {
  right: -6%;
  top: 10%;
  width: 28%;
  height: 55%;
  background: radial-gradient(circle at center,
    rgba(194, 220, 81, 0.16) 0%, transparent 65%);
}
</style>
