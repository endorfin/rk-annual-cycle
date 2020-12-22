<script>
import Vue from 'vue';
import RkAnnualCycle from '@/rk-annual-cycle.vue';

export default Vue.extend({
  name: 'ServeDev',

  components: {
    RkAnnualCycle
  },

  data () {
    return {
      editmode: false,
      entries: [
        {
          name: 'Winterruhe',
          color: '#DC2626',
          data: '444 444 443 210 000 000 000 000 001 234 444 444'
        },
        {
          name: 'Aktivitätsphase',
          color: '#2563EB',
          data: '000 000 001 234 444 444 444 444 433 221 000 000'
        },
        {
          name: 'Brutzeit',
          color: '#059669',
          data: '000 000 000 001 244 444 332 211 000 000 000 000'
        },
        {
          name: 'Jungtiere',
          color: '#FBBF24',
          data: '000 000 000 000 000 012 444 444 431 000 000 000'
        }
      ]
    }
  }
});
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <h1>Annual Cycle</h1>

      <rk-annual-cycle v-model="entries" :editmode="editmode" />

      <p>
        <button @click="editmode=!editmode">
          Toggle editmode
        </button>

        <input v-model="entries[0].data" type="text">
      </p>

      <h2>Data</h2>
      <pre>{{ entries }}</pre>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    max-width: 1200px;
    margin: 50px auto;
  }
</style>
