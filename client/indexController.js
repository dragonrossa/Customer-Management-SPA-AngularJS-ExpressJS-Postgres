var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/main", {
            templateUrl: "main.html",
            controller: "Main"
        })
        .when("/user", {
            templateUrl: "user.html",
            controller: "User"
        })
        .when("/usersForm", {
            templateUrl: "usersForm.html",
            controller: "formCtrl"
        })
        .when("/usersView", {
            templateUrl: "usersView.html",
            controller: "formCtrl2"
        })
        .when("/editUser", {
            templateUrl: "editUser.html",
            controller: "formCtrl3"
        })
        .when("/userDetail/:id", {
            templateUrl: "userDetail.html",
            controller: "formCtrl4"
        })
        .when("/userUpdated", {
            templateUrl: "userUpdated.html",
            controller: "formCtrl5"
        })
        .when("/userInserted", {
            templateUrl: "userInserted.html",
            controller: "formCtrl5"
        })
        .when("/userDeleted", {
            templateUrl: "userDeleted.html",
            controller: "formCtrl5"
        })
        // .when("/test/:id", {
        //     templateUrl: "test.html",
        //     controller: "formCtrl4"
        // })
        .when("/deleteUser", {
            templateUrl: "deleteUser.html",
            controller: "DeleteUserID"
        });

});

app.controller('Main', function ($scope) {


})

//this is for idex.html
app.controller('showhidectrl', function ($scope) {


    $scope.hideval = false;
    $scope.isShowHide = function (param) {
        if (param == "show") {
            $scope.showval = true;
            $scope.hideval = false;
        }
        else if (param == "hide") {
            $scope.hideval = true;
            $scope.showval = false;
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
        }
    }

    $scope.myStyle = {
        "padding-left": "20px"
    }

}

);


app.controller('formCtrl', function ($scope, $http, $location) {
    $scope.name = '';
    $scope.initials = '';
    $scope.eyeColor = '';
    $scope.age = '';
    $scope.guid = '';
    $scope.email = '';
    $scope.users = [];

    $scope.myTxt = "Waiting for new user...";
    $scope.submit = function () {
        if ($scope.name) {
            alert("New user in database!");
            $scope.users.push(this.name);
            $scope.users.push(this.initials);
            $scope.users.push(this.eyeColor);
            $scope.users.push(this.age);
            $scope.users.push(this.guid);
            $scope.users.push(this.email);


            $location.path('/userInserted');

            var data = {
                name: this.name,
                initials: this.initials,
                eyeColor: this.eyeColor,
                age: this.age,
                guid: this.guid,
                email: this.email
            }
            // console.log(JSON.stringify(data))


            $scope.formData = {};
            $scope.todoData = this.data;
            // console.log(data);




            $http({
                method: 'GET',
                url: 'http://localhost:3000/name/' + this.name + '/initials/' + this.initials + '/eyeColor/' + this.eyeColor + '/age/' + this.age + '/guid/' + this.guid + '/email/' + this.email,
            }).then(function successCallback(response) {
                //  console.log("It's ok")
                //     console.log(response)


            }).catch(function errorCallback(response) {
                // console.log("It's not ok")

            });







            //calling nodeJS POST API +

            $http({
                method: 'POST',
                url: 'http://localhost:3000/users/new/post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data
            }).then(function successCallback(response) {
                // console.log("It's ok")
                // this callback will be called asynchronously
                // when the response is available
            }).catch(function errorCallback(response) {
                //  console.log("It's not ok")
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


            $scope.name = '';
            $scope.initials = '';
            $scope.eyeColor = '';
            $scope.age = '';
            $scope.guid = '';
            $scope.email = '';



        }
    };


    $scope.myStyleForm = {
        "margin-left": "100px"
    };

    $scope.myStyle = {
        "margin-left": "50px"
    };
    $scope.myStyle2 = {
        "margin-left": "46px"
    };

    $scope.myStyle3 = {
        "margin-left": "65px"
    };

    $scope.myStyle4 = {
        "margin-left": "20px"
    };

    $scope.myStyle5 = {
        "margin-left": "65px"
    };

    $scope.myStyle6 = {
        "margin-left": "60px"
    };

    $scope.Submit = {
        "margin-left": "0px"
    };



});



app.controller('formCtrl2', function ($scope, $http, $route) {


    $http({
        method: 'GET',
        url: 'http://localhost:3000/usersView'
    }).then(function successCallback(response) {
        // console.log("It's ok")
        // console.log(response)

        var data = response.data;

        //   console.log(data)

        //  console.log(data[0].name)

        $scope.name = data[0].name
        $scope.initials = data[0].initials
        $scope.eyeColor = data[0].eyeColor
        $scope.age = data[0].age
        $scope.guid = data[0].guid
        $scope.email = data[0].email



    }).catch(function errorCallback(response) {
        // console.log("It's not ok")

    });




    $scope.myStyleForm = {
        "margin-left": "20px"
    };

    $scope.myStyle = {
        "margin-left": "30px"
    };
    $scope.myStyle2 = {
        "margin-left": "25px"
    };

    $scope.myStyle3 = {
        "margin-left": "45px"
    };

    $scope.myStyle4 = {
        "margin-left": "10px"
    };

    $scope.myStyle5 = {
        "margin-left": "40px"
    };

    $scope.Submit = {
        "margin-left": "80px"
    };

});

//  angular.module('Index', [])
app.controller('IndexList', ['$scope', '$rootScope', function ($scope, $rootScope) {


    $rootScope.iphone2 = 'http://localhost:5000/iphone'
    $rootScope.kitchen2 = 'http://localhost:5000/kitchen'
    $rootScope.users2 = 'http://localhost:5000/users'
    $rootScope.test2 = 'http://localhost:5000/test'

    $rootScope.myStyle = {
        "padding": "50px",
        "color": "white",
        "background-color": "cornflowerblue",
        "font-size": "60px",
        "padding": "50px"
    }


    $rootScope.myBody = {
        "padding-left": "10px",
        "padding-right": "10px"
    }

}])
    .controller('NamesController', ['$scope', function ($scope) {
        // $scope.names = ['Iphone', 'Kitchen', 'Users']
        $scope.iphone = ['Iphone']
        $scope.kitchen = ['Kitchen']
        $scope.users = ['Users']
        $scope.test = ['Test']
    }])

app.controller('User', function ($scope, $http) {

    // var list = []


    $scope.listID = []



    $http({
        method: 'GET',
        url: 'http://localhost:3000/user'
    }).then(function successCallback(response) {
        //  console.log("It's ok")
        //   console.log(response)

        var data = response.data;

        // if ($scope.listID.length > 0) {
        //     $scope.listID = []

        // }



        for (var i = 0; i <= data.length; i++) {



            $scope.listID.push(data[0][i].id + " " + data[0][i].name + " " + data[0][i].initials + " " + data[0][i].eyecolor + " " + data[0][i].age + " " + data[0][i].guid + " " + data[0][i].email)

            $scope.id = data[0][i].id;
            $scope.name = data[0][i].name;
            $scope.initials = data[0][i].initials;
            $scope.eyeColor = data[0][i].eyecolor;
            $scope.age = data[0][i].age;
            $scope.guid = data[0][i].guid;
            $scope.email = data[0][i].email;


            // console.log($scope.id)
            // console.log($scope.listID)



        }

        //  console.log($scope.listName)




        // $route.reload();

    }).catch(function errorCallback(response) {
        //   console.log("It's not ok")

    });

    // console.log(list)

    $scope.myStyle = {
        "padding-left": "20px"
    }

    $scope.myStyle2 = {
        "font-weight": "bold"
    }





})

app.controller('formCtrl3', function ($scope, $http, $location) {

    // $scope.edit = 'http://localhost:5000/editUserID'

    $scope.listID = []
    $scope.ubaciID = []
    $scope.userName = []

    $http({
        method: 'GET',
        url: 'http://localhost:3000/user'
    }).then(function successCallback(response) {
        //  console.log("It's ok")
        // console.log(response)

        var data = response.data;





        for (var i = 0; i <= data.length; i++) {



            $scope.listID.push(data[0][i].id)

            $scope.userName.push(data[0][i].name)



            $scope.id = data[0][i].id;
            $scope.name = data[0][i].name;

            // console.log($scope.ubaciID)

        }





    }).catch(function errorCallback(response) {
        // console.log("It's not ok")

    });

    // $scope.DetailID = this.id


    $scope.myFunc = function () {
        //  console.log("I'm in")

        //  console.log(this.id)

        let detailID = this.id

        $scope.detailID = detailID

        $http({
            method: 'GET',
            url: 'http://localhost:3000/id/' + this.detailID
        }).then(function successCallback(response) {
            // console.log("It's ok")

            //  console.log($scope.detailID)

            //  console.log(response)







        }).catch(function errorCallback(response) {
            // console.log("It's not ok")

            //  console.log(response)

        });
    };





    $scope.myStyleEdit = {
        "padding-left": "20px"
    }

    $scope.myStyle = {
        "font-weight": "bold",
        "padding-bottom": "10px"
    }




},


    app.controller('formCtrl4', function ($scope, $http, $routeParams, $route, $location) {


        $scope.testID = $routeParams.id

        //console.log($scope.testID)

        $scope.users = [];

        var data = {}

        $http({
            method: 'GET',
            url: 'http://localhost:3000/id/' + $scope.testID
        }).then(function successCallback(response) {
            //  console.log("It's ok")

            // console.log($scope.testID)

            //  console.log(response.data)

            $scope.name = response.data.name
            $scope.initials = response.data.initials
            $scope.eyeColor = response.data.eyecolor
            $scope.age = response.data.age
            $scope.guid = response.data.guid
            $scope.email = response.data.email

            data.name = $scope.name
            data.initials = $scope.initials
            data.eyeColor = $scope.eyeColor
            data.age = $scope.age
            data.guid = $scope.guid
            data.email = $scope.email

        }).catch(function errorCallback(response) {
            // console.log("It's not ok")
            //  console.log(response)

        });

        $scope.submit = function () {
            if ($scope.name) {
                alert("User updated!");
                $scope.users.push(data);
                // console.log(JSON.stringify(data))
                $scope.formData = {};
                $scope.todoData = this.data;
                // console.log(data);



                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/change/id/' + $scope.testID + '/name/' + this.name + '/initials/' + this.initials + '/eyeColor/' + this.eyeColor + '/age/' + this.age + '/guid/' + this.guid + '/email/' + this.email,
                }).then(function successCallback(response) {
                    //  console.log("It's ok")
                    //  console.log(response)


                }).catch(function errorCallback(response) {
                    //  console.log("It's not ok")

                })

                $location.path('/userUpdated');


            }
        }




    }),


    app.controller('DeleteUserID', function ($scope, $http, $location) {

        $scope.listID = []

        $http({
            method: 'GET',
            url: 'http://localhost:3000/user'
        }).then(function successCallback(response) {
            // console.log("It's ok")
            //  console.log(response)
            var data = response.data;

            for (var i = 0; i <= data.length; i++) {



                $scope.listID.push(data[0][i].name)

                $scope.id = data[0][i].id;
                $scope.name = data[0][i].name;
                $scope.initials = data[0][i].initials;
                $scope.eyeColor = data[0][i].eyecolor;
                $scope.age = data[0][i].age;
                $scope.guid = data[0][i].guid;
                $scope.email = data[0][i].email;



                //     console.log($scope.listID)


            }


        }).catch(function errorCallback(response) {
            //  console.log("It's not ok")

        });


        $scope.name = ''

        $scope.submit = function () {

            $http({
                method: 'GET',
                url: 'http://localhost:3000/name/' + this.name,
            }).then(function successCallback(response) {
                // console.log("It's ok")
                //   console.log(response)
                alert("User deleted!");
                $location.path('/userDeleted');


            }).catch(function errorCallback(response) {
                // console.log("It's not ok")

            });

        }




        $scope.myStyle = {
            "padding-left": "20px"
        }


    }),

    app.controller('formCtrl5', function ($scope, $location) {

        $scope.submit = function () {

            $location.path('/');


        }

    })


);

