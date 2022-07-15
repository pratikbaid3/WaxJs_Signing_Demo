import React from 'react';
import './styles.css';
import * as waxjs from '@waxio/waxjs/dist'; // development only

export default function App() {
    const wax = new waxjs.WaxJS({
        rpcEndpoint: 'https://wax.greymass.com',
        userAccount: 'pptkq.c.wam',
        tryAutoLogin: false,
        pubKeys: [
            'EOS6hMXgvPoyJyFLeji6TaMRg4dUSSsZCmdcKjnTzfHh65iM5zB3c',
            'EOS8UhZSLGoiUSifugc4x2LrLbKW6GwKKNzJbxtZBBChqcKbfV18G',
        ],
    });

    async function login() {
        try {
            const userAccount = await wax.login();
            document.getElementById('response').append(userAccount);
        } catch (e) {
            document.getElementById('response').append(e.message);
        }
        alert('You have Succesfully loged in');
    }

    async function sign() {
        if (!wax.api) {
            return document
                .getElementById('response')
                .append('* Login first *');
        }

        try {
            console.log(wax.userAccount);
            console.log(wax.pubKeys);
            const result = await wax.api.transact(
                {
                    actions: [
                        {
                            account: 'eosio.token',
                            name: 'transfer',
                            authorization: [
                                {
                                    actor: wax.userAccount,
                                    permission: 'active',
                                },
                            ],
                            data: {
                                from: wax.userAccount,
                                to: 'eosio',
                                quantity: '0.00000001 WAX',
                                memo: '',
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 1200,
                }
            );
            console.log(result);
            document.getElementById('response').append(JSON.stringify(result));
        } catch (e) {
            document.getElementById('response').append(e.message);
        }
    }
    return (
        <div className='App'>
            <button id='login' onClick={login}>
                Wax login
            </button>
            <br />
            <hr />
            <button id='sign' className='btn btn-success' onClick={sign}>
                Sign transaction
            </button>
            <h2 id='response'> </h2>

            <p id='demo'></p>
        </div>
    );
}
