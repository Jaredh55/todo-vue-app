/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [

        // {
        // id: 1,
        // text: "Walk the dog",
        // complete: true
        // },

        // {
        // id: 2,
        // text: "Take out the trash",
        // complete: false
        // },

        // {
        // id: 3,
        // text: "Buy Groceries",
        // complete: false
        // }

      ],
      textFilter: "",
      sortAttribute: "text",
      sortAscending: "true",

      newTask: {
        text: "",
        id: "",
      }

    };
  },
  created: function() {
    axios
    .get('/api/tasks')
    .then(function(response) {
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      if (this.newTask.text) {
        var clientParams = {
          text: this.newTask.text,
          id: this.newTask.id,
          complete: false
        };

        axios
        .post('/api/tasks', clientParams)
        .then(function(response) {
          this.tasks.push(response.data);
          this.newTask.text = '';
        }.bind(this));

      }

    },

    // markComplete: function(input_task) {
    //   // input_task.complete = true;
    //   var indexOfNewTask = this.tasks.indexOf(input_task);
    //   this.tasks.splice(indexOfNewTask, 1);

    toggleComplete: function(input_task) {
      input_task.complete = !input_task.complete;
    },
    numberOfIncompleteTasks: function(tasks) {
      var count = 0
      this.tasks.forEach(function(task) {
        if (!task.complete) {count++};
      });
      return count;
    },
    deleteCompleted: function() {
      var incompleteTasks = [];
      this.tasks.forEach(function(task) {
        if (!task.complete) {incompleteTasks.push(task)};
      });
      this.tasks = incompleteTasks;
    },
    isValidTask: function(inputtask) {
      return inputtask.text.includes(this.textFilter);
    },
    setAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }
      this.sortAttribute = inputAttribute;  
    }

    // isPositive: function(input_task) {
    //   if (input_task.text.indexOf("sucks") === -1) {
        
    //   }
    // }

  },
  computed: {
    sortedTasks: function() {
      return this.tasks.sort(function(task1, task2) {
        var lowerAttribute1 = task1[this.sortAttribute].toLowerCase();
        var lowerAttribute2 = task2[this.sortAttribute].toLowerCase();

        if (this.sortAscending) {
        return lowerAttribute1.localeCompare(lowerAttribute2);
        }else{
        return lowerAttribute2.localeCompare(lowerAttribute1); 
        } 
      }.bind(this));
    } 
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  data: function() {
    return {

    };
  },
  router: router
});