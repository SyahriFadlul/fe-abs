<template>
<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

<div class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
    <div>
        <div class="uk-panel">
            <img src="images/slider1.jpg" width="400" height="600" alt="">
            <div class="uk-position-center uk-panel"><h1>1</h1></div>
        </div>
    </div>
    <div>
        <div class="uk-panel">
            <img src="images/slider2.jpg" width="400" height="600" alt="">
            <div class="uk-position-center uk-panel"><h1>2</h1></div>
        </div>
    </div>
</div>

<a class="uk-position-center-left uk-position-small uk-hidden-hover" href uk-slidenav-previous uk-slider-item="previous"></a>
<a class="uk-position-center-right uk-position-small uk-hidden-hover" href uk-slidenav-next uk-slider-item="next"></a>

</div>
</template>

<script setup>
import { useProductStore } from '../../stores/product';


const productStore = useProductStore()
</script>
