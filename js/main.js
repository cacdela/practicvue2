Vue.component('colum', {
    props: ['name'],  // Добавленный props для передачи уникального имени колонки
    template: `
    <div class="colum">
      <h2 v-if="!editing" @click="startEditing">{{ text }}</h2>
      <form v-else @submit.prevent="finishEditing">
        <input v-model="text" @blur="finishEditing">
      </form>

      <div class="cards-container">
        <cards v-for="(card, index) in cards" :key="index" @removeCard="removeCard(index)"></cards>
      </div>

    </div>
    `,
    data() {
        return {
            text: 'Нажмите, чтобы изменить',
            editing: false,
            cards: [],
        };
    },
    methods: {
        startEditing() {
            this.editing = true;
        },
        finishEditing() {
            this.editing = false;
            localStorage.setItem(`${this.name}_editableText`, this.text);
        },
        addCard() {
            this.cards.push({});
            this.saveCardsToLocalStorage();
        },
        removeCard(index) {
            this.cards.splice(index, 1);
            this.saveCardsToLocalStorage();
        },
        saveCardsToLocalStorage() {
            localStorage.setItem(`${this.name}_savedCards`, JSON.stringify(this.cards));
        },
    },
    mounted() {
    },
});


let app = new Vue({
    el: '#app',
    data: {},
    methods: {},
});
