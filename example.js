angular.module('finnfuglen', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router']);

angular.module('finnfuglen').config(function($stateProvider) {
  $stateProvider.state(
    'egenskaper', {
      url: '/:rygg,:vinge,:mage,:hode,:storrelse,:beinlengde',
      controller: 'FuglarCtrl'
    }
  );
});

angular.module('finnfuglen').controller('FuglarCtrl', function($scope, $state, $stateParams) {
  var vm = $scope;

  vm.palette = {
    brun: 'SaddleBrown',
    'grå': 'LightGrey',
    svart: '#444444',
    kvit: 'White',
    rosa: 'Pink',
    oransje: 'Orange',
    'blå': 'SteelBlue',
    'rød': 'OrangeRed',
    gul: 'Gold',
    'grønn': 'ForestGreen',
    lilla: 'Purple'
  };

  vm.resultat = [];

  vm.finnFugl = function() {
    vm.resultat = sortertResultat(vm.kroppsdelFarger, vm.storrelse, vm.beinlengde);
  };

  vm.tomFelt = function() {
    vm.resultat = [];
    vm.kroppsdelFarger = {
      Rygg: null,
      Vinge: null,
      Mage: null,
      Hode: null
    };
    vm.storrelse = null;
    vm.beinlengde = null;
  }
  vm.oppdaterURLParametere = function(rygg, vinge, mage, hode, storrelse, beinlengde) {
    $state.go(
      'egenskaper', {
        rygg: rygg,
        vinge: vinge,
        mage: mage,
        hode: hode,
        storrelse: storrelse,
        beinlengde: beinlengde
      }
    );
  };
  vm.logParams = function() {
    console.log($stateParams, vm.resultat.length);
  }
  vm.logParams();

  vm.$on('$viewContentLoaded', function() {
    vm.kroppsdelFarger = {
      Rygg: $stateParams.rygg || null,
      Vinge: $stateParams.vinge || null,
      Mage: $stateParams.mage || null,
      Hode: $stateParams.hode || null
    };
    vm.storrelse = $stateParams.storrelse || null;
    vm.beinlengde = $stateParams.beinlengde || null;

    vm.finnFugl();
  });
});

function sortertResultat(kroppsdelFarger, storrelse, beinlengde) {
  var fuglar = [
    ['Bokfink hann', 'brun', 'svart kvit gul', 'rød rosa', 'grå', 'liten', 'korte'],
    ['Bokfink hunn', 'brun grå', 'svart gul', 'brun grå', 'brun grå', 'liten', 'korte'],
    ['Stillits', 'brun', 'svart gul', 'brun grå', 'rød kvit', 'liten', 'korte'],
    ['Grønnfink', 'grønn', 'grønn gul svart', 'grønn', 'grønn', 'liten', 'korte'],
    ['Kjernebiter', 'brun', 'svart', 'brun kvit grå', 'brun', 'liten', 'korte'],
    ['Dompap', 'grå kvit brun', 'svart grå brun', 'rød brun', 'svart grå', 'liten', 'korte'],
    ['Tornirisk', 'brun', 'svart brun', 'rød kvit', 'grå brun rød', 'liten', 'korte'],
    ['Grankorsnebb hann', 'brun rød oransje', 'brun', 'brun rød oransje', 'brun rød oransje', 'liten', 'korte'],
    ['Grankorsnebb hun', 'grønn', 'brun grønn', 'gul kvit', 'grå kvit gul', 'liten', 'korte'],
    ['Gulspurv', 'gul brun', 'gul brun', 'gul brun', 'gul brun', 'liten', 'korte'],
    ['Ravn', 'svart lilla', 'svart lilla', 'svart', 'svart', 'middels', 'korte'],
    ['Kråke', 'grå', 'svart', 'grå svart', 'svart', 'middels', 'korte'],
    ['Skjære', 'svart kvit', 'svart', 'kvit', 'svart', 'middels', 'korte'],
    ['Nøtteskrike', 'grå', 'grå', 'brun', 'brun', 'middels', 'korte'],
    ['Pirol', 'gul', 'svart', 'gul', 'gul', 'liten', 'korte'],
    ['Lavskrike', 'brun grå', 'rød brun grå', 'grå brun', 'brun', 'liten', 'korte'],
    ['Grønnsisik hann', 'grønn', 'gul grønn', 'gul grønn', 'grønn', 'liten', 'korte'],
    ['Grønnsisik hunn', 'grønn', 'grønn gul', 'kvit grå', 'grønn', 'liten', 'korte'],
    ['Rosenfink', 'grå rød', 'brun', 'kvit rød rosa', 'rød brun', 'liten', 'korte'],
    ['Bjørkefink', 'brun kvit', 'oransje svart', 'rød', 'svart', 'liten', 'korte'],
    ['Gråspurv', 'brun grå', 'brun', 'grå', 'brun grå', 'liten', 'korte'],
    ['Lerke', 'brun', 'brun', 'kvit', 'brun', 'liten', 'korte'],
    ['Linerle', 'grå', 'svart grå', 'kvit', 'kvit svart', 'liten', 'korte'],
    ['Kjøttmeis', 'grå grønn blå', 'grå svart', 'gul', 'svart kvit', 'liten', 'korte'],
    ['Blåmeis', 'grønn blå', 'blå', 'gul', 'blå kvit', 'liten', 'korte'],
    ['Fuglekonge', 'grå grønn', 'grå svart brun', 'kvit grå', 'rød gul grønn', 'liten', 'korte'],
    ['Måltrost', 'brun', 'brun', 'kvit', 'brun', 'liten middels', 'korte'],
    ['Svarttrost hann', 'svart', 'svart', 'svart', 'svart', 'liten middels', 'korte'],
    ['Svarttrost hunn', 'brun', 'brun', 'brun', 'brun', 'liten middels', 'korte'],
    ['Rødstrupe', 'brun', 'brun', 'rød oransje', 'brun rød oransje', 'liten', 'korte'],
    ['Fossekall', 'svart', 'svart', 'kvit', 'svart brun', 'liten', 'korte'],
    ['Gråsisik', 'grå rosa', 'grå svart', 'rosa grå', 'brun rød grå', 'liten', 'korte'],
    ['Gjerdesmett', 'brun', 'bru', 'brun', 'brun', 'liten', 'korte'],
    ['Kattugle', 'brun', 'brun', 'kvit brun', 'brun kvit', 'stor', 'korte'],
    ['Tårnugle', 'brun grå', 'grå brun', 'brun kvit', 'kvit grå brun oransje', 'stor', 'korte'],
    ['Hegre', 'grå', 'grå', 'grå kvit', 'kvit', 'stor', 'lange'],
    ['Stork', 'kvit', 'svart', 'kvit', 'kvit', 'stor', 'lange'],
    ['Svane', 'kvit', 'kvit', 'kvit', 'kvit', 'stor', 'korte'],
    ['Trane', 'grå', 'grå svart', 'grå', 'kvit svart', 'stor', 'lange'],
    ['Stær', 'brun', 'grønn brun', 'svart', 'svart grønn', 'liten', 'korte'],
    ['Gråmåke', 'grå', 'grå', 'kvit', 'kvit', 'stor middels', 'korte'],
    ['Grågås', 'brun', 'grå', 'kvit', 'brun kvit', 'stor', 'korte'],
    ['Havørn', 'brun', 'brun', 'brun', 'brun', 'stor', 'korte'],
    ['Rørdrum', 'brun', 'brun', 'brun kvit', 'brun', 'stor', 'lange'],
    ['Gauk hann', 'grå', 'grå', 'kvit', 'grå', 'middels', 'korte'],
    ['Gauk hunn', 'brun', 'brun', 'kvit', 'grå kvit', 'middels', 'korte'],
    ['Kongeørn', 'brun', 'brun', 'brun', 'brun', 'stor', 'korte'],
    ['Stokkand hann', 'grå', 'grå', 'grå brun', 'grønn', 'middels', 'korte'],
    ['Stokkand hunn', 'brun', 'brun', 'brun', 'brun', 'middels', 'korte'],
    ['Snøugle', 'kvit', 'kvit', 'kvit', 'kvit', 'stor', 'korte'],
    ['Gulerle', 'grønn', 'svart', 'gul', 'blå grå', 'liten', 'korte'],
    ['Såerle', 'grønn', 'svart', 'gul', 'grønn', 'liten', 'korte'],
    ['Orrfugl hann', 'svart', 'brun', 'svart', 'svart', 'stor', 'korte'],
    ['Orrfugl hunn', 'brun', 'brun', 'kvit', 'brun', 'stor', 'korte'],
    ['Storfugl Tiur', 'svart', 'brun', 'grønn svart', 'svart', 'stor', 'korte'],
    ['Storfugl Røy', 'brun', 'brun', 'brun', 'brun', 'stor', 'korte'],
    ['Grønnspett', 'grønn', 'grønn', 'grønn', 'rød', 'middels', 'korte'],
    ['Flaggspett', 'svart', 'svart', 'kvit', 'kvit svart rød', 'middels', 'korte'],
    ['Skogdue', 'grå', 'grå brun', 'rosa', 'grå grønn', 'middels', 'korte'],
    ['Isfugl', 'blå', 'blå', 'oransje', 'blå', 'liten', 'korte'],
    ['Teist', 'svart', 'kvit', 'svart', 'svart', 'middels', 'korte'],
    ['Lomvi', 'svart', 'svart', 'kvit', 'brun', 'middels', 'korte'],
    ['Havsule', 'kvit', 'kvit', 'kvit', 'gul', 'stor', 'korte'],
    ['Munk hann', 'grå', 'grå', 'grå', 'grå svart', 'liten', 'korte', 'munk (fugl)'],
    ['Munk hunn', 'grå', 'grå brun', 'grå', 'brun rød', 'liten', 'korte', 'munk (fugl)'],
    ['Gransanger', 'brun', 'brun', 'kvit grå', 'brun', 'liten', 'korte'],
    ['Jernspurv', 'brun', 'brun', 'grå', 'grå', 'liten', 'korte'],
    ['Hagesanger', 'brun', 'brun', 'kvit', 'brun', 'liten', 'korte'],
    ['Løvsanger', 'brun', 'brun', 'kvit', 'brun', 'liten', 'korte'],
    ['Rødstjert', '', 'brun', 'rød oransje', 'svart grå', 'liten', 'korte'],
    ['Sivspurv', 'brun', 'brun', 'kvit', 'svart', 'liten', 'korte'],
    ['Svarthvit fluesnapper', 'svart', 'svart brun', 'kvit', 'svart', 'liten', 'korte', 'fluesnapper'],
    ['Toppmeis', 'grå', 'svart', 'grå', 'grå', 'liten', 'korte'],
    ['Trekryper', 'brun', 'brun', 'kvit', 'brun', 'liten', 'korte'],
    ['Granmeis', 'grå', 'grå', 'grå', 'svart', 'liten', 'korte']
  ];

  var a = {
    FUGL: 0,
    RYGGFARGE: 1,
    VINGEFARGE: 2,
    MAGEFARGE: 3,
    HODEFARGE: 4,
    STORRELSE: 5,
    BEINLENGDE: 6,
    WIKILINK: 7
  }

  var resultat = [];
  fuglar.forEach(function(fugl) {
    var score = 0;
    if (fugl[a.RYGGFARGE].indexOf(kroppsdelFarger.Rygg) !== -1) score++;
    if (fugl[a.VINGEFARGE].indexOf(kroppsdelFarger.Vinge) !== -1) score++;
    if (fugl[a.MAGEFARGE].indexOf(kroppsdelFarger.Mage) !== -1) score++;
    if (fugl[a.HODEFARGE].indexOf(kroppsdelFarger.Hode) !== -1) score++;
    if (fugl[a.STORRELSE].indexOf(storrelse) !== -1) score++;
    if (fugl[a.BEINLENGDE].indexOf(beinlengde) !== -1) score++;
    resultat.push([fugl[a.FUGL], score, fugl[a.WIKILINK] || fugl[a.FUGL].split(' ')[0]]);
  });
  resultat.sort(function(a, b) {
    return b[1] - a[1];
  });
  if (resultat[0][1] === 0) return [];
  return resultat;
}
