angular.module('Iphone', [])
    .controller('IphoneList', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.id = 1;
        $rootScope.name = 'Apple iPhone 11 Pro Max';
        $rootScope.released = '2019, September 20';
        $rootScope.weight = '226g';
        $rootScope.thickness = '8.1mm';
        $rootScope.guid = '459085d1-bb17-4e8e-a671';
        $rootScope.os = 'iOS 13, up to iOS 13.4';
        $rootScope.storage = '64GB/256GB/512GB storage, no card slot';
        $rootScope.size = '6.5" - 1242x2688 pixels';
        $rootScope.camera = '12MP, 2160p';
        $rootScope.memory = '4GB RAM, Apple A13 Bionic';
        $rootScope.battery = '3969mAh, Li-lon';
        //afer NetworkController
        //Launch
        $rootScope.announced = '2019, September 10';
        $rootScope.status = 'Available. Released 2019, September 20';
        //after DisplayController
        //Platform
        $rootScope.OS = 'iOS 13, upgradable to iOS 13.4'
        $rootScope.Chipset = 'Apple A13 Bionic (7 nm+)'
        $rootScope.CPU = 'Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)'
        $rootScope.GPU = 'Apple GPU (4-core graphics)'
        //Memory
        $rootScope.card_slot = 'No'
        $rootScope.internal = '64GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM NVMe'
        //after SelfieCameraController
        //Sound
        $rootScope.loudspeaker = 'Yes, with stereo speakers'
        $rootScope.jack_3_5mm = 'No'
        //Comms
        $rootScope.WLAN = 'Wi-Fi 802.11 a/b/g/n/ac/ax, dual-band, hotspot'
        $rootScope.bluetooth = '5.0, A2DP, LE'
        $rootScope.GPS = 'Yes, with A-GPS, GLONASS, GALILEO, QZSS'
        $rootScope.NFC = 'Yes'
        $rootScope.Radio = 'No'
        $rootScope.USB = '2.0, proprietary reversible connector'
        //after BatteryController
        //Misc
        $rootScope.colors = 'Space Gray, Silver, Gold, Midnight Green (matte colors)'
        $rootScope.models = 'A2218, A2161, A2220'
        $rootScope.SAR = '1.16 W/kg (head), 1.17 W/kg (body)'
        $rootScope.SAR_EU = '0.95 W/kg (head), 0.99 W/kg (body)'
        $rootScope.Price = '€ 1,159.00 / $ 1,029.99 / £ 989.00 / ₹ 117,100'

        $rootScope.myStyle = {
            "font-weight": "bold"
        }

        $rootScope.myStyle2 = {
            "color": "white",
            "background-color": "cornflowerblue",
            "font-size": "60px",
             "padding": "50px"
        }

        $rootScope.myBody = {
             "padding-left": "50px",
             "padding-right": "50px"
        }




    }])
    .controller('NetworkController', ['$scope', function ($scope) {
        $scope.technology = ['GSM/CDMA/HSPA/EVDO/LTE'];
        $scope.TwoG_bands = ['GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2 (dual-SIM) - for China, CDMA 800 / 1900'];
        $scope.ThreeG_bands = ['HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100, CDMA2000 1xEV-DO'];
        $scope.FourG_bands = ['1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A2218',
            '1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 29, 30, 34, 38, 39, 40, 41, 42, 46, 48, 66, 71 - A2161',
            '1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 29, 30, 34, 38, 39, 40, 41, 42, 46, 48, 66, 71 - A2220'];
        $scope.Speed = ['HSPA 42.2/5.76 Mbps, LTE-A 1.6 Gbps DL, EV-DO Rev.A 3.1 Mbps']
    }])
    .controller('BodyController', ['$scope', function ($scope) {
        $scope.dimension = ['158 x 77.8 x 8.1 mm (6.22 x 3.06 x 0.32 in)'];
        $scope.weight = ['226 g (7.97 oz)'];
        $scope.build = ['Glass front (Gorilla Glass), glass back (Gorilla Glass), stainless steel frame'];
        $scope.SIM = ['Single SIM (Nano-SIM and/or eSIM) or Dual SIM (Nano-SIM, dual stand-by) - for China',
            'IP68 dust/water resistant (up to 4m for 30 mins)',
            'Apple Pay (Visa, MasterCard, AMEX certified)'];

    }])
    .controller('DisplayController', ['$scope', function ($scope) {
        $scope.type = ['Super Retina XDR OLED capacitive touchscreen, 16M colors'];
        $scope.size = ['6.5 inches, 102.9 cm2 (~83.7% screen-to-body ratio)'];
        $scope.resolution = ['1242 x 2688 pixels, 19.5:9 ratio (~458 ppi density)'];
        $scope.protection = ['Scratch-resistant glass, oleophobic coating',
            '800 nits max brightness (advertised)',
            'Dolby Vision',
            'HDR10',
            'Wide color gamut',
            'True-tone',
            '120Hz touch-sensing'];

    }])
    .controller('MainCameraController', ['$scope', function ($scope) {
        $scope.triple = ['12 MP, f/1.8, 26mm (wide), 1/2.55", 1.4µm, dual pixel PDAF, OIS',
            '12 MP, f/2.0, 52mm (telephoto), 1/3.4", 1.0µm, PDAF, OIS, 2x optical zoom',
            '12 MP, f/2.4, 13mm (ultrawide)'];
        $scope.features = ['Quad-LED dual-tone flash, HDR (photo/panorama)'];
        $scope.video = ['4K@24/30/60fps, 1080p@30/60/120/240fps, HDR, stereo sound rec.'];
    }])
    .controller('SelfieCameraController', ['$scope', function ($scope) {
        $scope.dual = ['12 MP, f/2.2, 23mm (wide)',
            'SL 3D, (depth/biometrics sensor)'];
        $scope.features = ['HDR'];
        $scope.video = ['4K@24/30/60fps, 1080p@30/60/120fps, gyro-EIS'];
    }])
    .controller('FeaturesController', ['$scope', function ($scope) {
        $scope.sensors = ['Face ID, accelerometer, gyro, proximity, compass, barometer',
            'Siri natural language commands and dictation'];
    }])
    .controller('BatteryController', ['$scope', function ($scope) {
        $scope.title = ['Non-removable Li-Ion 3969 mAh battery (15.04 Wh)'];
        $scope.charging = ['Fast charging 18W, 50% in 30 min (advertised)', 'USB Power Delivery 2.0', 'Qi wireless charging'];
        $scope.talk_time = ['Up to 20 h (multimedia)'];
        $scope.music_play = ['Up to 80 h'];
    }])
    .controller('TestsController', ['$scope', function ($scope) {
        $scope.performance = ['AnTuTu: 459713 (v7), 536883 (v8)',
            'GeekBench: 13870 (v4.4), 3503 (v5.1)',
            'GFXBench: 57fps (ES 3.1 onscreen)'];
        $scope.display = ['Contrast ratio: Infinite (nominal)', 'USB Power Delivery 2.0'];
        $scope.camera = ['Photo / Video'];
        $scope.loudspeaker = ['Voice 71dB / Noise 74dB / Ring 79dB'];
        $scope.audio_quality = ['Noise -94.3dB / Crosstalk -81.5dB'];
        $scope.battery_life = ['Endurance rating 102h'];
    }])
    ;