<template lang="pug">

  .parameter-category-group-wrapper
    .numeric-parameters-wrapper
      .parameter-wrapper(
        v-for="(parameter, i) in numericAttributes"
        :key="`numeric-${i}`"
      )
        ParameterControlNumeric(
          :auxInputVisibible="auxInputVisibible"
          :parameter="parameter"
        )

    v-divider
    .variable-parameters-wrapper
      .parameter-wrapper(
        v-for="(parameter, i) in variableAttributes"
        :key="`variable-${i}`"
      )
        ParameterControlVariable(
          :auxInputVisibible="auxInputVisibible"
          :parameter="parameter"
        )

</template>

<script>
import ParameterControlNumeric from '@/components/ParameterControlNumeric.vue';
import ParameterControlVariable from '@/components/ParameterControlVariable.vue';

export default {
  data: () => ({
    numericAttributes: null,
    variableAttributes: null,
  }),

  props: {
    // sketchIndexSelected: {
    //   type: Number,
    // },
    category: {
      type: String,
    },
    RegisteredSketches: {
      type: Array,
    },
    auxInputVisibible: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    ParameterControlNumeric,
    ParameterControlVariable,
  },

  mounted() {
    this.numericAttributes = this.getCategoryParameters('numeric');
    this.booleanAttributes = this.getCategoryParameters('boolean');
    this.variableAttributes = this.getCategoryParameters('variable');
  },

  methods: {
    getCategoryParameters(attributeType) {
      let properties = [];
      const validPropTypes = ['numeric', 'variable', 'boolean'];

      for (let parameter in this.RegisteredSketches[this.sketchIndexSelected]) {
        let thisParameter = this.RegisteredSketches[this.sketchIndexSelected][parameter];

        if (
          thisParameter.category !== this.category ||
          !validPropTypes.includes(thisParameter.attrType) ||
          thisParameter.attrType !== attributeType
        ) {
          continue;
        }

        thisParameter.attrName = parameter;
        properties.push(thisParameter);
      }

      return properties;
    },
  },

  computed: {
    sketchIndexSelected() {
      return this.$store.state.sketchIndexSelected;
    },
  },
};
</script>

<style lang="scss">
.numeric-parameters-wrapper {
  margin-bottom: 2rem;
}

p.parameter-title {
  margin: 25px auto 15px;
}
.v-input--radio-group {
  margin-top: initial;

  .v-input__slot {
    margin-bottom: 0;
  }
}

.noUi-target {
  margin: 10px 0;
}
</style>
