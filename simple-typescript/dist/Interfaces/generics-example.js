"use strict";
function genericFunction(X) {
    return X;
}
const genericArrowFunction = (X) => X;
//Generic class
class GenericClass {
    constructor(props) {
        this.props = props;
    }
    getProps() {
        return this.props;
    }
}
const chocolateCakes = [{ expirableDate: new Date() }];
const vanillaCakes = [{ expirableDate: new Date() }];
const getExpiredItems = (items) => {
    const currentDate = new Date().getTime();
    return items.filter(item => item.expirableDate.getDate() < currentDate);
};
const expiredChocoCakes = getExpiredItems(chocolateCakes);
const expiredVanillaCakes = getExpiredItems(vanillaCakes);
