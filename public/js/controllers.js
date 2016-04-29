'use strict';

var app = angular.module('bankApp');

// controllers.js
// all controllers

app.controller('mainCtrl', function($scope, Bank) {
  console.log('mainCtrl!');


  Bank.getAll()
  .then(res => {
    $scope.banks = res.data;
    console.log($scope.banks)
  })
  .catch(err => {
    console.log('err:', err);
  });

  $scope.createBank = () => {
    Bank.create($scope.newBank)
    .then(res => {

      var bank = res.data;

      $scope.banks.push(bank);
      $scope.newBank = null;
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.removeBank = bank => {
    Bank.remove(bank)
    .then(() => {
      var index = $scope.banks.indexOf(bank);
      $scope.banks.splice(index, 1);
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.toggleComplete = bank => {
    console.log('toggleComplete bank:', bank);
    Bank.toggle(bank)
    .then(() => {

    })
    .catch(err => {
      console.error(err);
    });
  };

  var currentBalance;
  var currentIndex;
  var index;

  var balance = 0;
  var debits = 0;

  $scope.showEditBalance = function(bank, index) {
    $scope.editShow = true;
    currentBalance = bank;
    currentIndex = index;

    $scope.editDescription = bank.desc2;
    $scope.editDebits = bank.debits;
    $scope.editCredits = bank.credits;
  }

    $scope.saveEdit = function(editDescription, editDebits, editCredits) {

      if (confirm ('Are you sure edit?') ) {
        var obj = {
          date: new Date().toISOString().slice(0,10),
          desc: editDescription,
          debits: editDebits,
          credits: editCredits
        }

        $scope.banks[currentIndex] = obj;

        debits = 0, balance = 0;
        for (var i=0; i < $scope.banks.length; i++ ) {
              debits = debits + parseInt($scope.banks[i].debits);
              balance = balance + parseInt($scope.banks[i].credits);
        }
      }
    }

  $scope.cancelEdit = function() {
    $scope.newBalanceToEdit = null;
    $scope.editShow = false;
  }



});
