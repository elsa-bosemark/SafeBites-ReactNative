import Resturaunt from '../models/resturaunt'

export const RESTURANTS = [
    new Resturaunt(
        '123nfnaser', //id  yelp
        'Luna Chicken', //title yelp
        '$$$$', //price yelp
        0.5, //distance yelp?
        //cover yelp
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
        [ //images yelp
            'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
            'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg',
        ],
        true, //curbsidepickup yelp?
        false, //takeout yelp?
        true, //delivery yelp?
        false, // outdoorseating yelp?
        10, //capacity yelp?
        [//hours yelp

            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 0
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 1
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 2
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 3
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 4
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 5
            },
            {
                "is_overnight": false,
                "start": "1730",
                "end": "2200",
                "day": 6
            }
        ],
        //tags yelp
        [
            'french',
            'casual',
            'vegetarian'
        ],
        '415 608 4254',//phone number yelp
        'https://maps.google.com/?cid=10281119596374313554',// directions google
        0,//maskScore
        0,//socialDistancingScore
        0,//barriersScore
        //0=yes 1= idk 3= no
        1,//glovesBool
        0,//paymentBool
        3,//surfaceBool
        3,//tempBool
        0,//handsanatizerBool
        1,//utensilsBool
        4.5, // yelpScore yelp
        3.4, //googleScore google
        "https://www.google.com.au/about/careers/locations/sydney/", //website google
    ),
]  