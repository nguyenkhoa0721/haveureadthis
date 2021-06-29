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
    <div class="column is-9 pt-5 px-5 mr-5">
      <div class="field is-grouped pb-3">
        <div class="control">
          <input
            class="input is-small"
            v-model="search"
            type="text"
            placeholder="Search"
          />
        </div>
        <div class="control">
          <button class="button is-small is-primary" v-on:click="get_list()">
            Search
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
                  <p class="has-text-grey">{{ "Author: " + item[2] }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <nav
        class="pagination is-small"
        role="navigation"
        aria-label="pagination"
      >
        <a
          class="pagination-previous"
          title="This is the first page"
          :disabled="curr_page == 1"
          @click.prevent="curr_page == 1 ? (curr_page = 1) : (curr_page -= 1)"
          >Previous</a
        >
        <a class="pagination-next" @click.prevent="curr_page += 1">Next page</a>
        <ul class="pagination-list">
          <li>
            <a
              :class="
                curr_page == 1
                  ? 'pagination-link is-current'
                  : 'pagination-link'
              "
              @click.prevent="curr_page = 1"
              aria-label="Page 1"
              aria-current="page"
              >1</a
            >
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a
              :class="
                curr_page != 1
                  ? 'pagination-link is-current'
                  : 'pagination-link'
              "
              @click.prevent="
                curr_page != 1 ? (curr_page = curr_page) : (curr_page = 2)
              "
              aria-label="Goto page 2"
              >{{ curr_page == 1 ? 2 : curr_page }}</a
            >
          </li>
          <li>
            <a
              class="pagination-link"
              aria-label="Goto page 3"
              @click.prevent="
                curr_page != 1 ? (curr_page += 1) : (curr_page = 3)
              "
              >{{ curr_page == 1 ? 3 : curr_page + 1 }}</a
            >
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
        </ul>
      </nav>
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
        "data-structure-and-algorithm",
        "computer-vision-and-ai",
        "nlp",
        "networking-and-hacking",
        "database-mangement",
        "web-mobile",
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
      curr_page: 1,
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
            "Content-Type": "application/json",
          },
          params: {
            cate: cateq,
            type: typeq,
            lang: langq,
            search: this.search,
            page: this.curr_page - 1,
            limit: 15,
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
      this.curr_page = 1;
      this.get_list();
    },
    reset() {
      this.search = "";
      this.filter_cate = [];
      this.filter_type = [];
      this.filter_lang = [];
      this.curr_page = 1;
      this.get_list();
    },
  },
  watch: {
    curr_page: function (n, o) {
      console.log(this.curr_page);
      this.get_list();
    },
  },
};
</script>
<style scoped>
</style>