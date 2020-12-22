<template>
  <div class="rk-annual-cycle">
    <table>
      <thead>
        <tr>
          <th />
          <th
            v-for="month in monthNames"
            :key="month"
            colspan="3"
            class="rk-annual-cycle__month"
          >
            {{ month }}
          </th>
        </tr>
      </thead>
      <tbody>
        <rk-annual-cycle-entry
          v-for="(entry, index) in value"
          :key="`row-${index}`"
          :entry="entry"
          :editmode="editmode"
          @input="(value) => handleInput(value, index)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import RkAnnualCycleEntry from '@/rk-annual-cycle-entry'

export default {
  name: 'RkAnnualCycle',

  components: {
    RkAnnualCycleEntry
  },

  props: {
    value: {
      type: Array,
      required: true
    },

    editmode: {
      type: Boolean,
      default: () => false
    },

    monthNames: {
      type: Array,
      default: () => ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    }
  },

  methods: {
    addEntry () {
      this.value.push({
        name: 'new',
        color: '#333',
        data: '000 000 000 000 000 000 000 000 000 000 000 000'
      })
    },

    handleInput (value, index) {
      this.$set(this.value, index, value)
    }
  }
}
</script>

<style>
  .rk-annual-cycle {
    border: 1px solid #000;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }

  .rk-annual-cycle input {
    font-family: Arial, Helvetica, sans-serif;
  }

  .rk-annual-cycle input:disabled {
    background: transparent;
  }

  .rk-annual-cycle input::-webkit-outer-spin-button,
  .rk-annual-cycle input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .rk-annual-cycle input[type=number] {
    -moz-appearance: textfield;
  }

  .rk-annual-cycle table {
    width: 100%;
    border-collapse: collapse;
  }

  .rk-annual-cycle table thead tr {
    border-bottom: 2px solid #000;
  }

  .rk-annual-cycle__month {
    padding: 4px 0;
    text-align: center;
    border-left: 1px solid #000;
    font-size: 14px;
    font-weight: 600;
    width: 7%;
  }

  .rk-annual-cycle__name {
    border-top: 1px solid #000;
  }

  .rk-annual-cycle__name input {
    width: 99%;
    padding: 2px 4px;
    background: transparent;
    border: 0;
  }

  .rk-annual-cycle__entry {
    position: relative;
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    text-align: center;
  }

  .rk-annual-cycle__entry input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-appearance: none;
    width: 100%;
    background-color: transparent;
    border: 0;
    text-align: center;
    z-index: 10;
    outline: none;
  }

  .rk-annual-cycle__color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
</style>
