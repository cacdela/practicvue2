Vue.component('colum', {
    props: ['name'],
    template: `
    <div class="colum">
      <h2 v-if="!editing" @click="startEditing">{{ text }}</h2>
      <form v-else @submit.prevent="finishEditing">
        <input v-model="text" @blur="finishEditing">
      </form>

      <div class="cards-container">
        <cards v-for="(card, index) in cards" :key="index" @removeCard="removeCard(index)"></cards>
      </div>

      <button @click="addCard">Добавить карточку</button>
      <button @click="resetData">Сбросить</button>
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
        resetData() {
            this.text = 'Нажмите, чтобы изменить';
            this.cards = [];
            localStorage.removeItem(`${this.name}_editableText`);
            localStorage.removeItem(`${this.name}_savedCards`);
        },
    },
    mounted() {
        const savedText = localStorage.getItem(`${this.name}_editableText`);
        if (savedText) {
            this.text = savedText;
        }

        const savedCards = localStorage.getItem(`${this.name}_savedCards`);
        if (savedCards) {
            this.cards = JSON.parse(savedCards);
        }
    },
});

Vue.component('cards', {
    template: `    
    <div class="cards">
      Карточка
      <button @click="removeCard">Удалить</button>
    </div>
    `,
    methods: {
        removeCard() {
            this.$emit('removeCard');
        },
    },
});

let app = new Vue({
    el: '#app',
    data: {},
    methods: {},
});
