<template>
<div>
</div>

</template>

<script>
export default {
  name: 'book',
  props: ['mobileLayout']
}
</script>

<style lang="scss">

.mobile {
  .appreciate {
    flex-wrap: wrap;

    > .appreciate-item:first-child {
      margin-bottom: 1rem;
    }
  }
}

.book {
    padding: 2rem 2rem 1rem 2rem;
    text-align: center;

    img {
      width: 260px;
    }

    p {
      margin-top: 1.2rem;
      text-decoration: underline;
    }
}
</style>