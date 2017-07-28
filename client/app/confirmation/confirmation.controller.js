(function () {
	'use strict';

	angular
		.module('app.confirmation')
		.controller('ConfirmationController', ConfirmationController);

	ConfirmationController.$inject = ['$stateParams', '$state', 'patientFactory', 'visitFactory', 'symptomFactory'];

	function ConfirmationController($stateParams, $state, patientFactory, visitFactory, symptomFactory) {
		/* jshint validthis:true */
		var vm = this;
		vm.selected = [];

		activate();

		function activate() {

			visitFactory
				.getById($stateParams.state2[0])
				.then(function(visit){
					vm.visit = visit;
					vm.selected = visit.patientSymptoms;
					console.log(vm.selected);
				});

			symptomFactory
				.getAll()
				.then(function (symptoms) {
					vm.symptoms = symptoms;
					console.log(symptoms);
				});
		}
		
		vm.toggle = function (symptom, list) {
			var idx = list.indexOf(symptom);
			//console.log(idx);
			if (idx > -1) {
				list.splice(idx, 1);
			} else {
				list.push(symptom);
			}
		};

		vm.exists = function (symptom, list) {
			//console.log("list.indexOf");
			//console.log(list.indexOf(symptom));
			return list.indexOf(symptom) > -1;
		};
	}
})();
