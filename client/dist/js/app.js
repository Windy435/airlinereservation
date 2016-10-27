(function() {
    'use strict';

    angular.module('app', [
        'ui.bootstrap'
    ]);
})();

(function() {
    'use strict';

    angular
        .module('app')
        .directive('flightDetail', flightDetail);

    flightDetail.$inject = ['$http'];
    function flightDetail($http) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: FlightDetailController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                flightInfo: "="
            },
            templateUrl: 'flightDetail.html'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function FlightDetailController ($http) {
        var vm = this;

        vm.departIds = [];
        vm.arrivalIds = [];
        vm.OnChanged = OnChanged;

        activate();

        ////////////////

        function activate () {
            $http.get(`http://localhost:3000/api/flights/departures`)
                .then(function (res) {
                    vm.departIds = res.data.data;
                })
                .catch(function (err) {

                });
        }

        function OnChanged() {
            $http.get(`http://localhost:3000/api/flights/departures/${vm.flightInfo.from}/arrivals`)
                .then(function (res) {
                    vm.arrivalIds = res.data.data;
                })
                .catch(function (err) {

                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .directive('passengerInformation', passengerInformation);

    //passengerInformation.$inject = [''];
    function passengerInformation() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PassengerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                label: "@",
                passengerInfo: "="
            },
            templateUrl: "passengerInformation.html"
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function PassengerController () {
        
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .directive('flightInformation', flightInformation);

    //flightInformation.$inject = [''];
    function flightInformation() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: FlightInformationController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: "flightInformation.html"
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function FlightInformationController () {
        
    }
})();

(function() {
'use strict';

    angular
        .module('app')
        .controller('BookingController', BookingController);

    BookingController.$inject = ['$http'];
    function BookingController($http) {
        var vm = this;

        vm.stage = 0;                           // 0: search flight, 1: choose flights, 2: add information
        vm.flights = [{}];
        vm.availableFlights = [];
        vm.passengers = [];

        vm.AddFlight = addFlight;
        vm.SearchFlight = searchFlight;
        vm.ChooseFlight = chooseFlight;
        vm.BookFlight = bookFlight;

        activate();

        ////////////////

        function activate() {
       }

        function addFlight() {
            this.flights.push({});
        }

        function searchFlight() {
            // Clear old data
            vm.availableFlights = [];

            angular.forEach(vm.flights, function (value, key) {
                var date = moment.utc(value.depart).add(1, 'day').valueOf();

                $http.get(`http://localhost:3000/api/flights?departureId=${value.from}&arrivalId=${value.to}&date=${date}`)
                    .then((res)=>{
                        vm.availableFlights.push(res.data.data);
                    
                        vm.stage = 1;
                    })
                    .catch((err) => {

                    });
            });
        }

        function chooseFlight(destinationIndex, flightIndex) {
        }

        function bookFlight() {
        }
    }
})();