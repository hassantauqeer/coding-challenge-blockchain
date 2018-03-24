# ERC20 Token Wallet

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Token](#token)
- [Wallet DAPP](#wallet-dapp)


### Installation
```bash
cd wallet-dApp/
```
```bash
yarn
```
```bash
yarn start
```

### Project Structure

```
coding-challenge-blockchain/
  .gitignore
  README.md
  wallet-dApp/
    app/
      components
      containers
      css 
      app.js
      index.html	
      reducers.js
    docs
    internals
    server
    token/
      build       // -> Build files of Contract
      contracts	  // -> Solidity Contracts
      tests       // -> Contract's Unit Tests
      compile.js	    // -> Compiling file
      deploy.js	      // -> Deploying file
      factory.js	    // -> Contracts Instance
      saveToken.js    // -> connected Web3 with deployed contract (ABI + Contract Address)
      web3.js         // -> exporting Web3 instance
      
    README.md
    package.json
    yarn.lock
```

### Token
Name: Saving Token (ST)

Saving Token is an improvement of standard ERC20 with a new functionality of locking your account for a period of time (minutes), after each TX.

#### Scenario:
Contract is deployed, Ahmed has a Balance of 100 ST at xyz(address).
- Ahmed is able to make a ST Transaction which means Ahmed account is not locked at the moment.
- Ahmed checks his account Lock time by entering his address xyz(address), as Ahmed has not performed any transaction yet he     will get 0 as a return value from Locktime.
- Ahmed Locks his Account for some Minutes.
- Ahmed can perform only one TX after changing Locktime, until the LockTime is over after performing a TX again account gets     locked for amount of minutes Ahmed Locked his account.
- To Unlock his account Ahmed will change LockTime to 0 and account will be unlocked now Ahmed can perform a TX without any     wait of account unlocking.

#### New Functions:

* `trnasferOwner(address)` This function in Contract transfer Ownership of Token to another address. Only an owner can transfer Ownership.
* `changeLockTime(lockTime)` changeLockTime changes Lock Time of sender's Address.

#### New Variables:

* `nextTxTime` nextTxTime saves time after which an Account can perform TX.
* `lockTime` lockTime saves number of Minutes for which an account will be locked after each TX, by default its value is 0.
*  Rest are easy to understand.

#### Operations
```bash
cd wallet-dApp/
```
To compile Token
```bash
node token/compile.js
```
To Deploy Token, it will get Compiled ABI from `./compile.js` and it will deploy it.
```bash
node token/deploy.js
```
To run tests for Token
```bash
yarn run test
```


### Wallet DAPP

[React-Boilerplate](https://github.com/react-boilerplate/react-boilerplate) is used to develop Front-End wallet for Saving Token due to its awesome props handling, ajax call thorugh sagas, and most importantly the best project structure I ever saw in any boilerplate. 

[antd](https://ant.design/) the best and fastest React Framework to develop Front-End Apps.

* `containers/Home` combines all other Components at one place.
* `components/ChangeOperations` contains logic for those operations that change state of SavingToken such as `Change Owner`, `Change LockTime`.
* `components/CheckOperations` contains logic for those operations that only check (get) state of SavingToken varibales such as `Check Next TX Time`, `Check Balance`, `Check LockTime`.
* `components/SendToken` contains logic for Transfer(Token's modified Function).

*  Rest are easy to understand.


👤Any Recommendations, EIPs, bug Fixes or Issues are highly welcomed.😇


# Brickblock Coding Challenge - Ethereum

## The Goal
Your task is to write a smart contract that creates your own [ERC20 token](https://en.wikipedia.org/wiki/ERC20) and build a small web wallet [Dapp](https://ethereum.stackexchange.com/questions/383/what-is-a-dapp) for it, using [React](https://reactjs.org).

## The Process
1. Create a new repo wherever you like. Can be GitHub/GitLab/Bitbucket, doesn't matter.
1. In your repo, write a smart contract that implements the [ERC20 standard](https://theethereum.wiki/w/index.php/ERC20_Token_Standard)
1. Deploy your smart contract to a testnet of your choice
1. In your repo, create a new React app
1. Create a README.md explaining how to test the features you have built. Feel free to add additional thoughts, e.g. why you chose certain libraries or why you implemented a feature in a certain way etc.
1. Send us an email to dev@brickblock.io when you're ready to have it reviewed

## Acceptance Criteria
* Your smart contract has been deployed to either the Ropsten, Kovan or Rinkeby testnet
* Your smart contract implements the [ERC20 standard](https://theethereum.wiki/w/index.php/ERC20_Token_Standard)
* Your Dapp should be easy to install and run locally
* Your Dapp should be able to display the token balance of your ERC20 token for a given Ethereum address

## Bonus Round (not required but nice-to-have)
* Display the token balance of the currently active MetaMask account
* Add a button to transfer tokens from the currently active MetaMask account to another address
* Dockerize the app
* Deploy the app somewhere
* Anything else you could think of that would be cool for a web wallet to do. Surprise us…

## Rules
There are not many rules, really. It's all about the result. However, here are a few clarifications:

* Feel free to use as many 3rd party libraries or contracts as you'd like. For example, it's fine to use truffle boxes or [zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity). However, if you just drop in an empty ERC20 contract from OpenZeppelin: We won't be impressed.
* It’s ok and even encouraged to look for inspiration elsewhere but if you're taking the lazy way of just copy-and-pasting CodePen snippets: We won't be impressed.

## How we're evaluating the result
Prioritised from most important to least important, here are our evaluation criteria:

1. Feature Completeness: Does your Dapp fulfil all acceptance criteria?
1. UX: Is the Dapp working well?
1. Code Quality: Is the code clean, well-structured and easy to understand?
1. The extra mile: Did you write tests? Are code quality tools such as eslint, flow, prettier or solium in place? Is there documentation on how to get the app running?

You do not need to hit all points, but obviously, the more the better :)
