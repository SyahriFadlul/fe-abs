<script setup>
    
</script>
<template>

<div id="InvoiceModal" class="uk-modal-container uk-flex-top uk-modal uk-flex uk-open" uk-modal style="overscroll-behavior: contain; z-index: 1011;" tabindex="-1">
    <div class="uk-modal-dialog rounded uk-padding-small uk-margin-auto-vertical" style="border-radius: 8px; max-width: 978px !important;">
        <div class="uk-padding-small rounded rts-modal-header">
            <div class="uk-grid-small uk-width-1-1 uk-grid" uk-grid>
                <div class="uk-width-expand rts-modal-title uk-first-column">Detail Transaksi</div>
                <button class="uk-modal-close-default" type="button" uk-close></button>
            </div>
        </div>
        <div class="uk-modal-body uk-overflow-auto" uk-overflow-auto style="min-geight: 150px; max-height: 150px; overscroll-behavior: contain;">
            <div class="uk-grid-small uk-grid" uk-grid>
                <div class="uk-width-expand@m uk-width-2-3@l uk-width-1-1@s rts-modal-left uk-first-column">
                    <div class="rts-left-title">Menunggu Pembayaran</div>
                    <div uk-grid-style="margin-top: 22px;" class="uk-grid-stack">
                        <div class="uk-width-expand rts-invoice-number uk-first-colum">
                            Batas waktu pembayaran : 
                            <span class="uk-text-center">
                                <div class="uk-grid-small uk-child-width-auto uk-margin" uk-grid uk-countdown="date: 2024-02-21T23:25:16+00:00">
                                    <div>
                                        <div class="uk-countdown-number uk-countdown-hours "></div>
                                        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Hours</div>
                                    </div>
                                    <div class="uk-countdown-separator">:</div>
                                    <div>
                                        <div class="uk-countdown-number uk-countdown-minutes"></div>
                                        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Minutes</div>
                                    </div>
                                    <div class="uk-countdown-separator">:</div>
                                    <div>
                                        <div class="uk-countdown-number uk-countdown-seconds"></div>
                                        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Seconds</div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div uk-grid style="margin-top:22px;" class="uk-grid">
                        <div class="uk-grid-expand rts-modal-left rts-invoice-info uk-first-column">No. Invoice</div>
                        <div class="uk-width-auto rts-modal-left rts-invoice-number uk-text-right">INV-20240207BD103152</div>
                        </div>
                    <div uk-grid style="margin-top: 22px;" class="uk-grid">
                        <div class="rts-invoice-info rts-modal-left uk-first-column">Tanggal Pembayaran</div>
                        <div class="uk-width-expand uk-text-right rts-date-info">-</div>
                    </div>
                    <hr class="rts-divider-section uk-width-1-1@s">
                    <div class="rts-left-detail-title">Detail Produk</div>
                    <div class="uk-visible@s">
                        <div class="rts-item-box uk-visible@s" style="overscroll-behavior: contain;">
                            <div class="uk-padding-remove uk-margin-top uk-grid uk-grid-stack" uk-grid>
                                <div class="uk-width-1-1 uk-width-1-3@m uk-width-expand@l uk-flex uk-flex-middle rts-product-store uk-first-column">
                                    <span class="title-store">Dikirim dari RendStore Online - Menunggu Pembayaran</span>
                                </div>
                            </div>
                            <div class="rts-box-product uk-width-1-1 uk-flex@s uk-grid" uk-grid>
                                <div class="uk-padding-remove uk-width-auto@s uk-inline@s uk-first-column">
                                    <img src="../../assets/logo.svg" class="rts-product-image">
                                </div>
                                <div class="uk-width-auto@s uk-width-expand@m">
                                    <div class="rts-product-name rts-pointer">Iphone 12 Promax</div>
                                    <div class="rts-order-list-product-variant">
                                        <span>256GB</span>
                                        <span style="margin-left: 5px;">1 Barang</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="uk-border rounded uk-width-auto uk-flex-right">
                                        <div class="rts-product-price-title"> Total Harga </div>
                                        <div class="rts-product-price">Rp&nbsp;20.050.000,00</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.uk-modal.uk-open {
    opacity: 1;
}
.uk-flex {
display: flex;
}
.uk-modal-container
.uk-modal-dialog {
    width: 1200px;
}
.uk-open>.uk-modal-dialog {
    opacity: 1;
    transform: translateY(0);
}
.rts-modal-header {
    border-bottom: 1px solid #e5e5e5;
}
.rounded {
    border-radius: 8px;
}
.uk-padding-small {
    padding: 15px;
}
.uk-grid-small, .uk-grid-column-small {
    margin-left: -15px;
}
.uk-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
}
.rts-modal-title {
    font-size: 24px;
    font-weight: 700;
    font-stretch: condensed;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #000;
}
.uk-width-expand {
    flex: 1;
    min-width: 1px;
}
.uk-grid-small>*, .uk-grid-column-small>* {
    padding-left: 15px;
}
.rts-payment-close-button {
    cursor: pointer;
    margin: 0 -15px 0 0;
}
.rts-pointer {
    cursor: pointer;
}
.uk-grid-small>*, .uk-grid-column-small>* {
    padding-left: 15px;
}
element.style {
    min-height: 150px;
    max-height: 150px;
    overscroll-behavior: contain;
}
.uk-overflow-auto {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.uk-modal-body {
    display: flow-root;
    padding: 20px;
}
.uk-overflow-auto>:last-child {
    margin-bottom: 0;
}
.uk-modal-body>:last-child, .uk-modal-header>:last-child, .uk-modal-footer>:last-child {
    margin-bottom: 0;
}
.uk-grid-small, .uk-grid-column-small {
    margin-left: -15px;
}
.uk-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
}
.rts-modal-left {
    padding: 0 42px 0 0;
}
.rts-left-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    font-stretch: condensed;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #525252;
}
.rts-invoice-number {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #0cc701;
}
.uk-width-expand {
    flex: 1;
    min-width: 1px;
}
.uk-grid>*>:last-child {
    margin-bottom: 0;
}
.uk-text-center {
    text-align: center!important;
}
.rts-invoice-info {
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #6a6a6a;
}
.rts-divider-section {
    margin-top: 20px;
    margin-bottom: 20px;
    border-width: 5px;
}
.rts-left-detail-title {
    font-size: 20px;
    font-weight: 700;
    font-stretch: condensed;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #525252;
}
.rts-item-box[data-v-d63d49ac] {
    padding-left: 20px;
    max-height: 280px;
    overflow: auto;
}
.uk-padding-remove {
    padding: 0!important;
}
.uk-margin-top {
    margin-top: 10px!important;
}
.rts-product-store {
    padding-left: 20px;
}
.uk-flex-middle {
    align-items: center;
}
.uk-flex {
    display: flex;
}
.rts-product-store
.title-store {
    margin-left: -20px;
    font-size: 14px;
    font-weight: 400;
    font-stretch: condensed;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    text-align: left;
    color: #0cc701;
}
.uk-countdown-separator {
    font-size: 15px;
    font-weight: 700;
    margin-top: 20px;
}
.uk-countdown-hours {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
}
.uk-countdown-minutes {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
}
.uk-countdown-seconds {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
}

</style>