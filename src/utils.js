
function parse_items(items) {
    var message = '';

    for (var i = 0; i < items.length; i++) {
        var price = 0;
        message += `${items[i].name}: \n`;
        goods = items[i].items;
        for (var j = 0; j < goods.length; j++) {
            message += `${goods[j].title}\n`;
            price += goods[j].price;
        }
        message += `price: $${price/100}\n`;
        message += '--------------\n';
    }

    return message;
}

module.exports = {
    parse_items: parse_items,
};