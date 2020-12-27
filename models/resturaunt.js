class Resturaunt {//either cate ids or each seperate
    constructor(
        id,
        title, 
        price, 
        distance, 
        cover, 
        images, 
        curbsidePickUp, 
        takeOut, 
        delivery, 
        outdoorSeating, 
        capacity, 
        openHours, 
        tags, 
        phoneNumber, 
        direction, 
        maskScore, 
        socialDistancingScore, 
        barriersScore, 
        golvesBool, 
        paymentBool, 
        surfaceBool, 
        tempBool, 
        handSanatizerBool, 
        utensilsBool, 
        yelpScore, 
        googleScore, 
        website, 
        // deliveryApps, 
        // reservationApps
        ){
            this.id= id;
            this.title = title; 
            this.price = price;
            this.distance = distance;
            this.cover=cover;
            this.images=images;
            this.curbsidePickUp=curbsidePickUp;
            this.takeOut=takeOut;
            this.delivery=delivery;
            this.outdoorSeating=outdoorSeating;
            this.capacity=capacity;
            this.openHours=openHours;
            this.tags=tags;
            this.phoneNumber=phoneNumber; 
            this.direction = direction;
            this.maskScore = maskScore;
            this.socialDistancingScore = socialDistancingScore;
            this.barriersScore = barriersScore;
            this.golvesBool = golvesBool;
            this.paymentBool = paymentBool;
            this.surfaceBool = surfaceBool;
            this.tempBool = tempBool;
            this.handSanatizerBool = handSanatizerBool;
            this.utensilsBool= utensilsBool;
            this.yelpScore = yelpScore;
            this.googleScore = googleScore; 
            this.website = website; 
            // this.deliveryApps = deliveryApps;
            // this.reservationApps = reservationApps;

        }

}

export default Resturaunt;