<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" class="card-set">
      <a-tab-pane key="1" tab="Blister"></a-tab-pane>
      <a-tab-pane key="2" tab="Klt"></a-tab-pane>
    </a-tabs>
  </a-card>
  <BilTable v-if="activeKey == '1'" :activeKey="activeKey"></BilTable>
  <KltTable v-if="activeKey == '2'" :activeKey="activeKey"></KltTable>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import BilTable from "./bilTable.vue"
import KltTable from "./kltTable.vue"
const activeKey = ref("1")
</script>
