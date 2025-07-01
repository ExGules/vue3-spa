<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/incomes">Доходы</el-menu-item>
        <el-menu-item index="/orders">Заказы</el-menu-item>
        <el-menu-item index="/sales">Продажи</el-menu-item>
        <el-menu-item index="/stocks">Остатки</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
