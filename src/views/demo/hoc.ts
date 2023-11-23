import { h } from "vue";
const withPromise = (node, func) => {
  return {
    name: "withPromise",
    data() {
      return {
        result: null,
        loading: false,
        error: false,
      };
    },
    async mounted() {
      this.loading = true;
      let result = await func().finally(() => {
        this.loading = false;
      });
      this.result = result;
    },
    render() {
      return h(node, {
        props: {
          result: this.result,
          loading: this.loading,
        },
      });
    },
  };
};
const view = {
  template: `
        <div>
            <p>{{result}}</p>
        </div>
    `,
  props: ["result", "loading"],
};
export default withPromise;
