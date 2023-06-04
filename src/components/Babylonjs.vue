<template>
  <canvas id="babylon-scene"></canvas>
</template>

<script>
import { PBR } from "../Babylons/PBR.js";

export default {
  name: "HelloWorld",
  mounted() {
    let canvas;
    canvas = document.querySelector("#babylon-scene");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "babylon-scene";
    }
    new PBR(canvas);
  },
};
</script>

<style scoped>
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
