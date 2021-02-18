import { list } from '@keystone-next/keystone/schema';
// import { text } from 'body-parser';
import { text, select, integer, relationship, timestamp } from '@keystone-next/fields'


export const Order = list({
    fields: {
        action: select({
            options: [
                { label: 'BUY', value: 'BUY' },
                { label: 'SELL', value: 'SELL' }
            ],
            defaultValue: 'BUY',
            ui: {
                displayMode: 'segmented-control'
            }
        }),
        ticker: text({ isRequired: true, isUnique: false }),
        price: integer({ isRequired: true }),
        shares: integer({ isRequired: true, defaultValue: 1}),
        user: relationship({ ref: 'User.orders', many: false}),
        portfolio: relationship({ ref: 'Portfolio.orders', many: false }),
        date: timestamp({ isRequired: false, })
}
})
