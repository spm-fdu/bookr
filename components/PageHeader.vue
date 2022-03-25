<template>
  <div>
    <div class="header__login text-overline text-right pt-10 pr-16 text-decoration-none">
        <span>
            <nuxt-link to="/signup" class="text-overline text-decoration-none">sign up</nuxt-link>
        </span>
        <span>/</span>
        <span>
            <nuxt-link to="/login" class="text-overline text-decoration-none">login</nuxt-link>
        </span>
    </div>
  </div>
</template>

<style>
.header__login a { 
  transition: 0.3s;
  color: grey;
}
.header__login a:hover { 
  color: #3b47ec
}
</style>