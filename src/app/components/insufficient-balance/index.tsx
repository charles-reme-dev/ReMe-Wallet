import React, { Component, ReactNode } from 'react'

import { InsufficientBalanceRender } from './renderers'

import { withAuth } from '../HOCs'

type State = {}

class InsufficientBalance extends Component<{ history: any }, State> {

    render(): ReactNode {
        return (
            <section className='wrapper balance-wrapper'>
                <h2>ETH balance insufficient</h2>
                <div className='common-wrapper'>
                    {InsufficientBalanceRender(this)}
                </div>
            </section>
        )
    }
}

export default withAuth('/', InsufficientBalance, '/insufficient-balance')