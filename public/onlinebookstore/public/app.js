angular.module('bookstoreApp', [])
    .controller('BookController', function ($scope) {
        $scope.books = [
            { title: 'Book 1', author: 'Author 1', price: 10, imageUrl: 'book1.jpg' },
            { title: 'Book 2', author: 'Author 2', price: 15, imageUrl: 'book2.jpg' },
            { title: 'Book 3', author: 'Author 3', price: 20, imageUrl: 'book3.jpg' }
        ];

        $scope.cartItems = [];

        $scope.addToCart = function (book) {
            $scope.cartItems.push(book);
            $scope.calculateTotal();
        };

        $scope.calculateTotal = function () {
            $scope.total = $scope.cartItems.reduce((acc, item) => acc + item.price, 0);
        };

        $scope.checkout = function () {
            // Implement checkout logic here, e.g., send cart items to backend
            alert('Checkout successful!');
        };
    });