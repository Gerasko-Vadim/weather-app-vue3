<template>
    <Transition name="modal">
        <div v-show="modalActive" class="modal">
            <Transition name="modal-wrapper">
                <div v-if="modalActive" class="modal__wrapper">
                    <slot />
                    <div>
                        <button @click="$emit('close-modal')" class="modal__btn">Close</button>
                    </div>

                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
defineEmits(['close-modal'])
defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.modal {
    min-width: 100vw;
    min-height: 100vh;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: #00000030;

    &__wrapper {
        height: auto;
        padding: 10px;
        background: white;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        align-self: flex-start;
        margin-top: 65px;
        max-width: 60%;
        border-radius: 5px;
    }

    &__btn {
        color: white;
        background: $color-primary;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-radius: 5px;
        border-color: transparent;
    }
}

//animation
.modalenter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-wrapper-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-wrapper-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-wrapper-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-wrapper-leave-to {
  transform: scale(0.8);
}
</style>