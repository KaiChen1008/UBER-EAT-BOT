const {add_member,get_group_order}  = require('./api/uber_eat_api');
const {parse_items} = require('./utils');
const {STATE} = require('./state');
// https://eats.uber.com/group-orders/2cdc6a25-90bc-417f-a26c-512c03f7a204/join

var state = STATE.IDLE;
var groupCartId = '';

async function on_idle(context) {
  if (context.event.isText) {
    var message = context.event.text;

    if (message.includes('eats.uber.com/group-orders/')) {
      // Add bot to group cart 
      groupCartId = message.substring(message.search('orders')+7, message.search('/join')); // TODO use regrex instead
      var req = await add_member(groupCartId);
      // console.log(req);
      
      // Send message back
      await context.sendText(`Start listening on group cart: ${groupCartId}`);

      // Change state 
      state = STATE.LISTENING;
    }
  }
}

async function on_listening(context) {
  // TODO setInterval to listen the cart
  if (context.event.isText) {
    var message = context.event.text;
    if (message.includes('!price') || message==='$') {
      // return the cart
      var order = await get_group_order(groupCartId, false);
      context.sendText(parse_items(order));

    } else if (message.includes('!done') || message === '.') {
      // change state
      state = STATE.IDLE;
    }
  }
}

// async function on_finished(context) {
//   console.log('on finished');
// }

module.exports = async function App(context) {
  // await context.sendText('Welcome to Bottender');
  // console.log(context.event);
  if (context.event.isText && context.event.text === 'state') {
    context.sendText(state);
  }


  switch (state) {
    case STATE.IDLE:
      on_idle(context);
      break;
    case STATE.LISTENING:
      on_listening(context);
      break;
    case STATE.FINISHED:
      on_finished(context);
      break;
  }
};
