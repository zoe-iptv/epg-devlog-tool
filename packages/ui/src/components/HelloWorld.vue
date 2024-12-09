<template>
  <fieldset>
    <legend><strong>Radio buttons</strong></legend>
    <label for="radio-1">
      <input
        type="radio"
        id="radio-1"
        name="radio"
        value="R1"
        v-model="radioType"
      />
      R1
    </label>
    <label for="radio-2">
      <input
        type="radio"
        id="radio-2"
        name="radio"
        value="R2"
        v-model="radioType"
      />
      R2
    </label>
    <label for="radio-3">
      <input
        type="radio"
        id="radio-3"
        name="radio"
        value="R3"
        v-model="radioType"
      />
      R3
    </label>
  </fieldset>
  <select id="select" name="select" required="true" v-model="selectType">
    <option v-for="item in selectTypes" :value="item.id" :key="item.id">{{ item.name }}</option>
  </select>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const types1 = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
];
const types2 = [
  {
    id: 11,
    name: "11",
  },
  {
    id: 22,
    name: "22",
  },
  {
    id: 33,
    name: "33",
  },
];
const types3 = [
  {
    id: 111,
    name: "111",
  },
  {
    id: 222,
    name: "222",
  },
  {
    id: 333,
    name: "333",
  },
];

const radioType = ref("R1");
watch(radioType, () => {
  {
    console.log("watch", radioType.value);
  }
});
const selectTypes = computed(() => {
  selectType.value = "";
  switch (radioType.value) {
    case "R1":
      return types1;
    case "R2":
      return types2;
    case "R3":
      return types3;
    default:
      return types1;
  }
})
const selectType = ref("");


</script>
<style scoped></style>
