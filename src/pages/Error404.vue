<template>
  <div class="fullscreen bg-multi text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Nothing to see here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Back"
        no-caps
      />
    </div>
  </div>
</template>

<style scoped>
.bg-multi {
  background-image: linear-gradient(
    to right,
    #fbc2eb 0%,
    #a6c1ee 51%,
    #fbc2eb 100%
  );
  background-size: 200% auto;
  transition: background-position 0.2s;
}
</style>

<script>
export default {
  name: 'Error404'
}
</script>
