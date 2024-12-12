<template>
  <section class="layout_detail">
    <div class="content">
      <slot name="default"></slot>
    </div>

    <div class="bottom_sticky">
      <slot name="bottomSticky"></slot>
    </div>
  </section>
</template>
