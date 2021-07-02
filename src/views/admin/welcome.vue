<template>
  <div class="welcome">
    <!-- <img src="@/assets/img/welcome.jpg" alt=""> -->
    <h2>Welcome To Home</h2>
    <img src="@/assets/img/cat.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: "welcome"
}
</script>

<style scoped> 
  .welcome {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  img {
      width: 500px;
      height: 375px;
    }
  
  h2 {
    position: absolute;
    top: 50px;
    margin: auto;
  }
</style>
