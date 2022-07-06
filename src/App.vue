

<template>
 <div>
   <span>
     hello world 
     je suis le compteur et pour le moment je suis à {{count}}
   </span>

   <button @click="increment()">Incrémenter</button>
   <router-view></router-view>
 </div>

  
</template>
<script>
export default ({
  data() {
    return {
      count: 0
    }
    
  },

  methods: {
    increment: function(){
     this.count++
    }
  }
})
</script>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}


</style>
