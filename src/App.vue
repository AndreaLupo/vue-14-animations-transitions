<template>
  <div class="container">
    <div class="block" :class="{animate: animatedBlock}"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <transition name="para" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled">
      <p v-if="paraIsVisible">This paragraph is not always visible..</p>
    </transition>
    <button @click="toggleParagraph">Toggle paragraph</button>
  </div>

  <div class="container">
    <transition name="fade-button" mode="out-in">
      <button v-if="!usersAreVisible" @click="showUsers">Show users</button>
      <button v-else @click="hideUsers">Hide users</button>
    </transition>
  </div>
  
  <base-modal @close="hideDialog" v-if="dialogIsVisible" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>  

<script>
export default {
  data() {
    return { 
      animatedBlock: false,
      dialogIsVisible: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null
    };
  },
  methods: {
    animateBlock() {
      this.animatedBlock = true;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    beforeEnter(el) {
      console.log('beforeEnter()', el);
      el.style.opacity = 0;
    },
    /**
     * el: html element on which the animation is done
     * done: function that can call to notify that enter is ended
     */
    enter(el, done) {
      console.log('enter()', el);
      let round = 0;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log('afterEnter()', el);
    },
    enterCancelled(el) {
      console.log('Enter Cancelled', el);
      clearInterval(this.enterInterval);
    },
    beforeLeave(el) {
      console.log('beforeLeave()', el);
      el.style.opacity = 1;
    },
    leave(el, done) {
      console.log('leave()', el);
      let round = 0;
      this.leaveInterval = setInterval(() => {
        el.style.opacity = 1 - round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log('afterLeave()', el);
    },
    leaveCancelled(el) {
      console.log('leave Cancelled', el);
      clearInterval(this.leaveInterval);
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */

}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.animate {
  /* transform: translateX(-150px); */
  animation: slide-scale 0.3s ease-out forwards;
}

/**
/* entering start state *
.para-enter-from {
  /*  opacity: 0;
  transform: translateY(-30px); *
}

.para-enter-active {
  /* transition: all 0.3s ease-out; *
  animation: slide-scale 0.3s ease-out;
}

/* entering final state *
.para-enter-to {
  /* opacity: 1;
  transform: translateY(0); *
}

/* leaving start state *
.para-leave-from {
  /* opacity: 1;
  transform: translateY(0); *
}

.para-leave-active {
  /* transition: all 0.3s ease-in; *
  animation: slide-scale 0.3s ease-out;
}

/* leaving final state *
.para-leave-to {
  /* opacity: 0;
  transform: translateY(30px); *
}
*/

@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

</style>