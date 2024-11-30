const app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', function ($scope, $http) {
    $scope.employees = [];
    $scope.employee = {};
    $scope.isEdit = false;

    // Fetch Employees
    const fetchEmployees = () => {
        $http.get('http://localhost:3000/employees').then((response) => {
            $scope.employees = response.data;
        });
    };

    fetchEmployees();

    // Add or Update Employee
    $scope.addOrUpdateEmployee = () => {
        if ($scope.isEdit) {
            $http.put(`http://localhost:3000/employees/${$scope.employee._id}`, $scope.employee).then(() => {
                fetchEmployees();
                $scope.employee = {};
                $scope.isEdit = false;
            });
        } else {
            $http.post('http://localhost:3000/employees', $scope.employee).then(() => {
                fetchEmployees();
                $scope.employee = {};
            });
        }
    };

    // Edit Employee
    $scope.editEmployee = (emp) => {
        $scope.employee = angular.copy(emp);
        $scope.isEdit = true;
    };

    // Delete Employee
    $scope.deleteEmployee = (id) => {
        $http.delete(`http://localhost:3000/employees/${id}`).then(() => {
            fetchEmployees();
        });
    };

    // Sort Table
    $scope.sortKey = 'name';
    $scope.reverse = false;
    $scope.sort = (key) => {
        $scope.reverse = ($scope.sortKey === key) ? !$scope.reverse : false;
        $scope.sortKey = key;
    };
});
