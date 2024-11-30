const app = angular.module('CourseAPP', []);

app.controller('CourseController', function ($http, $scope) {

    $scope.courses = []
    $scope.course = {

    }
    $scope.isEdit = false

    $scope.selectedCourse = ""

    const fetchCourses = () => {

        $http.get('http://localhost:3000/api/courses').then((response) => {
            $scope.courses = response.data
        })
    }

    fetchCourses()

    $scope.addOrUpdateCourse = () => {
        if ($scope.isEdit) {
            $http.put(`http://localhost:3000/api/course/${$scope.course._id}`, $scope.course).then(() => {
                fetchCourses()
                $scope.course = {}
                $scope.isEdit = false
            })
        } else {
            $http.post(`http://localhost:3000/api/create`, $scope.course).then(() => {
                fetchCourses()
                $scope.course = {}

            })
        }
    }

    $scope.deleteCourse = (id) => {
        $http.delete(`http://localhost:3000/api/course/${id}`).then(() => {
            fetchCourses()
        })
    }

    $scope.editCourse = (course) => {
        $scope.course = angular.copy(course)
        $scope.isEdit = true
    }

    $scope.selectCourse = (course) => {
        $scope.selectedCourse = course.title
    }

})