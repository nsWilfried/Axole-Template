<template>
  <div style="background: #111">
    <div class="banner-component w-full flex items-center justify-center">
      <div
        class="banner-component__content h-full flex flex-col items-center justify-center"
      >
        <div class="banner-component__breadcrumb uppercase">
          <span class="banner__route-active">
            <router-link to="/">Home <font-awesome-icon icon="fa-solid fa-arrow-right-long" /></router-link>
          </span>

          <span> {{ name }} <font-awesome-icon icon="fa-solid fa-arrow-right-long" /> </span>
        </div>
        <div
          class="banner-component__title w-full flex items-center justify-center"
        >
          <span>{{ name }}.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    name: String
  },


  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";
@import "../assets/styles/_fonts.scss";
@import "../assets/styles/_mixins.scss";
.bottom {
  color: $secondary-bg;
}
.banner-component {
  font-family: $primary-font;
  height: 480px;
  background: $header-component-bg;

  &__content {
    width: $header-width;
    //background: orange;
  }

  &__title {
    height: auto;
    //background: blue;

    > span {
      font-weight: 600;
      color: #444;
      font-size: 80px;
      line-height: 1.2;
    }
  }

  &__breadcrumb {
    font-size: 12px;
    font-weight: 500;
    color: $secondary-color;
    letter-spacing: 3px;
    > span {
      margin-right: 1em;
    }
  }
}
</style>
