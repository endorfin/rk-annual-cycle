<template>
  <tr class="rk-annual-cycle__row">
    <td class="rk-annual-cycle__name">
      <input
        :value="entry.name"
        :disabled="!editmode"
        @blur="handleNameInput"
        type="text"
      >
    </td>
    <td
      v-for="(opacity, colIndex) in entries"
      :key="colIndex"
      class="rk-annual-cycle__entry"
    >
      <div
        :style="{'opacity': (opacity * 25 / 100), 'backgroundColor': entry.color}"
        class="rk-annual-cycle__color"
      />
      <input
        v-if="editmode"
        :value="entries[colIndex]"
        @input="(event) => handleDataInput(event, colIndex)"
        type="number"
        min="0"
        max="4"
      >
    </td>
  </tr>
</template>

<script>
export default {
  name: 'RkAnnualCycleEntry',

  props: {
    entry: {
      type: Object,
      required: true
    },

    editmode: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    entries () {
      return this.entry.data.replace(/\s/g, '').split('')
    }
  },

  methods: {
    chunk (arr, size) {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      )
    },

    handleNameInput (event) {
      this.$emit('input', { ...this.entry, name: event.target.value })
    },

    handleDataInput (event, index) {
      const value = (['0', '1', '2', '3', '4'].includes(event.target.value))
        ? event.target.value
        : this.entries[index]

      const data = [ ...this.entries ]
      data[index] = value
      const entryData = this.chunk(data, 3).map(part => part.join('')).join(' ')

      this.$emit('input', { ...this.entry, data: entryData })
    }
  }
}
</script>
