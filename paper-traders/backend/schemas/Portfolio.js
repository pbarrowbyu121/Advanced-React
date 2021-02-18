import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Portfolio = list({
    
    fields: {
        name: text({ isRequired: true }),
        user: relationship({ ref: 'User.portfolios', many: false}),
        orders: relationship({ ref: 'Order.portfolio', many: true })
    }
})