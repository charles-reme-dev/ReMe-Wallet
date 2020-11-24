import React, { Component, ReactNode } from 'react'

import { AuthRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

import { withAuth } from '../HOCs'

type State = {
    email: string
    password: string
    loading: boolean
}

class Auth extends Component<{ history: any }, State> {

    public constructor (props: any) {
        super(props)

        this.auth = this.auth.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)


        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    public render (): ReactNode {
        return (
            <div className='application'>
                { AuthRender(this)}
            </div>
        )
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public async auth () {
        try {
            this.setState({ loading: true })

            let navigateTo = '/dashboard'
            const email = this.state.email
            const password = this.state.password

            let user = await UserService.login(email, password)
            if (!user) {
                user = await UserService.register(email, password)
                navigateTo = '/mnemonic'
            }


            localStorage.setItem('user', JSON.stringify(user))
            this.props.history.push(navigateTo)
        }
        catch (error) {
            this.setState({ loading: false })

            console.log(error)
            ErrorPopUp.show('Invalid email or password')
        }
    }

}

export default withAuth('/dashboard', Auth, '/')
