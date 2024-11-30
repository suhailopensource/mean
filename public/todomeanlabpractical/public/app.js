angular.module('todoApp', [])
    .controller('TodoController', function ($http) {
        const vm = this;
        vm.tasks = [];
        vm.newTaskText = '';

        // Fetch tasks from the backend
        vm.getTasks = function () {
            $http.get('http://localhost:3000/api/tasks').then(function (response) {
                vm.tasks = response.data;
            });
        };

        // Add a new task
        vm.addTask = function () {
            if (vm.newTaskText) {
                $http.post('http://localhost:3000/api/tasks', { text: vm.newTaskText }).then(function (response) {
                    vm.tasks.push(response.data);
                    vm.newTaskText = '';  // Reset input field
                });
            }
        };

        // Toggle task completion
        vm.toggleComplete = function (task) {
            $http.put('http://localhost:3000/api/tasks/' + task._id, { completed: task.completed }).then(function (response) {
                angular.extend(task, response.data);  // Update task status
            });
        };

        // Delete a task
        vm.deleteTask = function (taskId) {
            $http.delete('http://localhost:3000/api/tasks/' + taskId).then(function () {
                vm.tasks = vm.tasks.filter(task => task._id !== taskId);
            });
        };

        // Initialize by getting tasks
        vm.getTasks();
    });
