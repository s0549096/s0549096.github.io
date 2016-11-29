webShop.controller('InventoryController', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log){

  $scope.removeArticle = function(article) {
    var removedArticle = $scope.inventory.indexOf(article);
    $scope.inventory.splice(removedArticle, 1);
  };

//Artikel hinzufuegen Modal
$scope.open = function (size) {

  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'views/adminViews/manage-articles.new.html',
    controller: function($scope, $uibModalInstance){
      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    },
    size: size,
  });

  modalInstance.result.then(function (selectedItem) {
  }, function () {
    $log.info('Modal dismissed at: ' + new Date());
  });
};

  $scope.addArticle = function(){
    $scope.inventory.push({
      name: $scope.newArticle.name,
      category: $scope.newArticle.category,
      price: parseInt($scope.newArticle.price),
      description: $scope.newArticle.description,
      quantity: $scope.newArticle.quantity,
      available: true,
      thumb: $scope.newArticle.thumb
    });

//reset placeholder
    $scope.newArticle = {};
    $scope.addArticleForm.$setUntouched();

  };

    $scope.editArticle = function(article) {
    $scope.editProduct = true;
    $scope.existingArticle = article;
  };

  $scope.saveArticle = function () {
    $scope.existingArticle = {};
    $scope.editProduct = false;
  };


//get test data
  $http.get('data/inventory.json').success(function(data){
    $scope.inventory = data;
  });

}]);
