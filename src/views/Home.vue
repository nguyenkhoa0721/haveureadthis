<template>
  <div class="columns">
    <div class="column is-3">
      <section class="hero is-fullheight has-background-white-bis p-5">
        <div class="container">
          <strong>Category</strong>
          <div class="buttons are-small mt-3">
            <button
              :class="[
                'button',
                'mr-1',
                'mb-1',
                check_cate(item, filter_cate, 'red'),
              ]"
              v-for="(item, index) in cate"
              :key="index"
              v-on:click="click_cate(item, filter_cate)"
            >
              {{ item }}
            </button>
          </div>
          <strong>Type</strong>
          <div class="buttons are-small mt-3">
            <button
              :class="[
                'button',
                'mr-1',
                'mb-1',
                check_cate(item, filter_type, 'yellow'),
              ]"
              v-for="(item, index) in type"
              :key="index"
              v-on:click="click_cate(item, filter_type)"
            >
              {{ item }}
            </button>
          </div>
          <strong>Language</strong>
          <div class="buttons are-small mt-3">
            <button
              :class="[
                'button',
                'mr-1',
                'mb-1',
                check_cate(item, filter_lang, 'green'),
              ]"
              v-for="(item, index) in lang"
              :key="index"
              v-on:click="click_cate(item, filter_lang)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </section>
    </div>
    <div class="column pt-5 px-5 mr-5">
      <div class="field is-grouped pb-3">
        <div class="control">
          <input
            class="input is-small"
            v-model="search"
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <div class="control">
          <button class="button is-small is-primary" v-on:click="get_list()">
            Tìm kiếm
            <main></main>
          </button>
        </div>
        <div class="control">
          <button class="button is-small" v-on:click="reset()">
            Clear filter
          </button>
        </div>
      </div>
      <div class="columns is-multiline is-mobile">
        <div class="column is-4" v-for="(item, index) in title" :key="index">
          <router-link :to="'/de/' + item[0]">
            <div class="card has-background-white-bis">
              <div class="card-content">
                <div class="content">
                  <strong>🟢 {{ item[1] }}</strong>
                  <br />
                  <p class="has-text-grey">{{ "Auther: " + item[2] }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      cate: [
        "programming-language",
        "computer-vision-and-ai",
        "data-structure-and-algorithm",
        "networking-and-hacking",
        "database-mangement",
        "web-development",
        "computer-engineering",
        "soft-skill",
      ],
      type: ["ebook", "repo", "courses"],
      lang: ["vi", "en"],
      filter_cate: [],
      filter_type: [],
      filter_lang: [],
      search: "",
      title: [],
    };
  },
  created() {
    this.get_list();
  },
  methods: {
    get_list() {
      var cateq = "";
      var langq = "";
      var typeq = "";
      for (let i in this.filter_cate)
        if (cateq == "") cateq += this.filter_cate[i];
        else cateq += "," + this.filter_cate[i];
      for (let i in this.filter_type)
        if (typeq == "") typeq += this.filter_type[i];
        else typeq += "," + this.filter_type[i];
      for (let i in this.filter_lang)
        if (langq == "") langq += this.filter_lang[i];
        else langq += "," + this.filter_lang[i];
      this.axios
        .get("/get", {
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            cate: cateq,
            type: typeq,
            lang: langq,
            search: this.search,
          },
        })
        .then((res) => {
          this.title = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    check_cate(value, arr, c) {
      if (arr.includes(value)) {
        if (c == "red") return "is-danger";
        else if (c == "yellow") return "is-warning";
        else if (c == "green") return "is-success";
      } else return null;
    },
    click_cate(value, arr) {
      var index = arr.indexOf(value);
      if (index !== -1) {
        arr.splice(index, 1);
      } else arr.push(value);
      this.search = "";
      this.get_list();
    },
    reset() {
      this.search = "";
      this.filter_cate = [];
      this.filter_type = [];
      this.filter_lang = [];
      this.get_list();
    },
  },
};
</script>
<style scoped>
</style>