/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [

        {
        id: 1,
        text: "Walk the dog",
        complete: true
        },

        {
        id: 2,
        text: "Take out the trash",
        complete: false
        },

        {
        id: 3,
        text: "Buy Groceries",
        complete: false
        }

      ],
      newTask: {
        text: "",
        id: "",
      }

    };
  },
  created: function() {},
  methods: {
    addTask: function() {
      var newTaskInfo = {
        text: this.newTask.text,
        id: this.newTask.id,
        complete: false
      };

      if (this.newTask.text) {
        this.tasks.push(newTaskInfo);
        this.newTask.text = '';
      }

    },

    markComplete: function(input_task) {
      // input_task.complete = true;
      var indexOfNewTask = this.tasks.indexOf(input_task);
      this.tasks.splice(indexOfNewTask, 1);

    },

    // isPositive: function(input_task) {
    //   if (input_task.text.indexOf("sucks") === -1) {
        
    //   }
    // }

  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});