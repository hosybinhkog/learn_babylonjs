<template>
  <canvas id="babylon-scene"></canvas>
</template>

<script>
import { SceneXRDemo } from "../Babylons/SceneXRDemo.js";

export default {
  name: "HelloWorld",
  mounted() {
    let canvas;
    canvas = document.querySelector("#babylon-scene");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "babylon-scene";
    }
    new SceneXRDemo(canvas);
  },
};
</script>

<style scoped>
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
