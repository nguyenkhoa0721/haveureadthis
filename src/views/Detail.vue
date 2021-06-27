<template>
  <div>
    <section class="hero has-background-white-bis">
      <div class="hero-body">
        <p class="title">{{ title }}</p>
      </div>
    </section>
    <div class="columns p-5 mx-6">
      <div class="column">
        <strong>Nội dung</strong>
        <p>{{ abbr }}</p>
      </div>
      <div class="column is-4">
        <div class="block">
          <a :href="url" target="chart"><button class="button is-success is-fullwidth">🎯 Direct to</button></a>
        </div>
        <div class="block">
          <strong>✒️ Auther: </strong>
          <div class="buttons are-small mt-3">
            <button class="button is-info is-small">
              {{ auther }}
            </button>
          </div>
        </div>
        <div class="block">
          <strong>📚 Category: </strong>
          <div class="buttons are-small mt-3">
            <button
              :class="['button', 'mr-1', 'mb-1', 'is-danger']"
              v-for="(item, index) in cate"
              :key="index"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div class="block">
          <strong>🕹️ Type: </strong>
          <div class="buttons are-small mt-3">
            <button :class="['button', 'mr-1', 'mb-1', 'is-warning']">
              {{ type }}
            </button>
          </div>
        </div>
        <div class="block">
          <strong>🔠 Language: </strong>
          <div class="buttons are-small mt-3">
            <button :class="['button', 'mr-1', 'mb-1', 'is-success']">
              {{ lang }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Detail",
  data() {
    return {
      cate: [],
      type: "",
      lang: "",
      auther: "",
      title: "",
      abbr: "",
      url: "",
    };
  },
  created() {
    this.axios
      .get("/de", {
        headers: {
        },
        params: {
          id: this.$route.params.id,
        },
      })
      .then((res) => {
        this.title = res.data[0];
        this.auther = res.data[1];
        this.type = res.data[2];
        this.lang = res.data[3];
        this.url = res.data[4];
        this.abbr = res.data[5];
        this.cate = res.data[6];
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>