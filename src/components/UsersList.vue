<template>
  <transition-group tag="ul" name="user-list">
    <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
  </transition-group>
  <input type="text" ref="userNameInput" />
  <button @click="addUser">Add User</button>
</template>

<script>
export default {
    data() {
        return {
            users: [ 'Max', 'Manu', 'Julie' ],

        };
    },
    methods: {
        addUser() {
            const enteredUsername = this.$refs.userNameInput.value;
            this.users.unshift(enteredUsername);
        },
        removeUser(user) {
            this.users = this.users.filter( usr => usr === user);
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
}

.user-list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.user-list-enter-active {
    transition: all 1s ease-out;
}

.user-list-enter-to,
.user-list-leave-from {
    opacity: 1;
    transform: translateX(0);
}


.user-list-leave-active {
    transition: all 1s ease-out;
    /** necessary for -move  class in the out transition */
    position: absolute;
}

.user-list-enter-to {
    opacity: 0;
    transform: translateX(30px);
}

/** on other elements of the list when an item is added or removed.
 */
.user-list-move {
    transition: transform 0.8s ease;
}
</style>