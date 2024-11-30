angular.module('Priyanshi', [])
    .controller('FinanceController', function ($http) {
        const vm = this;
        vm.records = [];
        vm.totalIncome = 0;
        vm.totalExpense = 0;
        vm.balance = 0;

        // Get all records
        vm.getRecords = function () {
            $http.get('http://localhost:3000/api/records').then(function (response) {
                vm.records = response.data;
                vm.calculateSummary();
            });
        };

        // Add a new record
        vm.addRecord = function () {
            const newRecord = {
                description: vm.description,
                amount: vm.amount,
                category: vm.category,
                type: vm.type
            };

            $http.post('http://localhost:3000/api/records', newRecord).then(function (response) {
                vm.records.push(response.data);
                vm.calculateSummary();
            });

            // Reset form fields
            vm.description = '';
            vm.amount = '';
            vm.category = 'Other';
            vm.type = 'income';
        };

        // Delete a record
        vm.deleteRecord = function (id) {
            $http.delete('http://localhost:3000/api/records/' + id).then(function () {
                vm.records = vm.records.filter(record => record._id !== id);
                vm.calculateSummary();
            });
        };

        // Calculate total income, expenses, and balance
        vm.calculateSummary = function () {
            vm.totalIncome = vm.records.filter(record => record.type === 'income')
                .reduce((sum, record) => sum + record.amount, 0);
            vm.totalExpense = vm.records.filter(record => record.type === 'expense')
                .reduce((sum, record) => sum + record.amount, 0);
            vm.balance = vm.totalIncome - vm.totalExpense;
        };

        // Initialize the records on page load
        vm.getRecords();
    });
