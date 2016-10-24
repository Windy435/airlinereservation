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

    //flightDetail.$inject = [''];
    function flightDetail() {
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
    function FlightDetailController () {
        var vm = this;

        vm.departIds = [];
        vm.arrivalIds = [];
        activate();

        ////////////////

        function activate () {
            vm.departIds = [
                'ABC',
                'DEF',
                'GHI'
            ];
            vm.arrivalIds = [
                'JKL',
                'MNO',
                'PQR'
            ];
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

        vm.flights = [];
        vm.passengers = [];
        vm.AddFlight = addFlight;
        vm.SearchFlight = searchFlight;
        vm.BookFlight = bookFlight;

        activate();

        ////////////////

        function activate() { 
        }

        function addFlight() {
            var newFlight = {
                from: '',
                to: '',
                depart: ''
            }

            this.flights.push(newFlight);
        }

        function searchFlight() {
            // Search flight information here

            for (var i = 0; i < vm.passengerCount; i++) {
                var newPassenger = {};

                vm.passengers.push(newPassenger);
            }
        }

        function bookFlight() {
            console.log(vm.passengers);
        }
    }
})();