(function () {
    'use strict';

    angular
        .module('app.symptom')
        .controller('SymptomController', SymptomController);

    SymptomController.$inject = ['$stateParams', '$state', 'symptomFactory', 'patientFactory', 'visitFactory', 'patientSymptomFactory'];

    function SymptomController($stateParams, $state, symptomFactory, patientFactory, visitFactory, patientSymptomFactory) {
        var vm = this;
        vm.selected = [];
        vm.createSymptom = createSymptom;
        vm.visit = {
            patientId: $stateParams.id
        }
        vm.patientSymptom = {};

        activate();

        /////////////////////////////////////////////////////////

        function activate() {
            symptomFactory
                .getAll()
                .then(function (symptoms) {
                    vm.symptoms = symptoms;
                });

            patientFactory
                .getById($stateParams.id)
                .then(function (patient) {
                    vm.patient = patient;
                });
        }

        vm.toggle = function (symptom, list) {
            var idx = list.indexOf(symptom);
            console.log(idx);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(symptom);
            }
        };

        vm.exists = function (symptom, list) {
            return list.indexOf(symptom) > -1;
        };

        function createSymptom(visit, patientSymptom) {
            visitFactory
                .create(visit)
                .then(function (visit) {
                    vm.visit = visit;

                    patientSymptom = {
                        visitId: vm.visit.id,
                    }

                    patientSymptomFactory
                        .create(patientSymptom)
                        .then(function (patientSymptom) {
                            vm.patientSymptom = patientSymptom;
                        })

                    $state.go('painScale', {id: patientSymptom.visitId});    
                })


            
        }

    }
})();
