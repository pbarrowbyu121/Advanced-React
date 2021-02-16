import { list } from '@keystone-next/keystone/schema';
// import { text } from 'body-parser';
import { text, password, relationship } from '@keystone-next/fields'

export const User = list({
    // access:
    // ui
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        orders: relationship({ ref: 'Order.user', many: true}),
        portfolios: relationship({ ref: 'Portfolio.user', many: true })
        //TODO, add roles, cart and orders
    }
})