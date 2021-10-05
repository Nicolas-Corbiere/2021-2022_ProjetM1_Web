<template>
  <div>
    <h1>Bienvenue dans HelloWorld : {{msg}}</h1>
  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  props: {
      msg : String
  }
}
</script>


<style>
  small {
    display: block;
  }
</style>