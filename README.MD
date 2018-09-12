### Hyperchain javascript sdk

#### Import(引入)
```html
<script src="./dist/js-qsnark-sdk.js"></script>
```
#### Usage(使用)
```js
const config = {
    phone: '<phone>',
    password: "<password>",
    apiKey: "<apiKey>",
    apiSecret: "<apiSecret>"
}

var sdk = new SDK(function(token){
    console.log(sdk.getAccessToken());
    // +write other code ...
    // eg. create account ...
    sdk.createAccount(function(data) {
        console.log(data);
    });
});

/**
 * var sdk = new SDK(function(token){
 *     console.log(sdk.getAccessToken());
 *     // +write other code ...
 * }, config.phone, config.password, config.apiKey, config.apiSecret);
 */

```
#### API(接口)

##### Auth(授权)
###### 1. refreshApiToken(刷新Token)
```js
sdk.refreshApiToken(function(token) {
    console.log(sdk.getAccessToken())
})
```
##### Block(区块)
###### 1. queryBlock(查询区块信息)
```js
sdk.queryBlock("number", "latest", function(data) {
    console.log(data);
})
```
###### 2. queryBlocks(分页获取区块信息)
```js
sdk.queryBlocks("1", "3", function(data) {
    console.log(data);
})
```
###### 3. queryBlocksByRange(查询某范围内区块信息)
```js
sdk.queryBlocksByRange("2", "4", function(data) {
    console.log(data);
})
```
##### Transaction(交易)
###### 1. queryTransactionCount(获取交易总数)
```js
sdk.queryTransactionCount(function(data) {
    console.log(data);
})
```
###### 2. queryTransactionByHash(通过hash查询某交易)
```js
sdk.queryTransactionByHash("0xed70377c261bfdc7dd7f4fc15c8961c145f9457186d6ff95f60907e9fb63d827", function(data) {
    console.log(data);
})
```
###### 3. queryTransactionReceipt(查询交易回执)
```js
sdk.queryTransactionReceipt("0xed70377c261bfdc7dd7f4fc15c8961c145f9457186d6ff95f60907e9fb63d827", function(data) {
    console.log(data);
})
```
###### 4. queryDiscardTransaction(查询无效交易)
```js
sdk.queryDiscardTransaction("1515140350903604865", "1515140350903604867", function(data) {
    console.log(data);
})
```
##### Contract(合约)
###### 1. compileContract(编译合约)
```js
sdk.compileContract("contract test{}", function(data) {
    console.log(data);
})
```
###### 2. deployContract&deployContractSync(部署合约)
```js
sdk.deployContract("0x60606040523415600e57600080fd5b5b603680601c6000396000f30060606040525b600080fd00a165627a7a72305820b4c36b8b61723f302432d246407a061599017f8607ed26f1c053b5ecc63a54200029","0x3713c3d01ae09cf32787c9c66c9c0781cf4b613d", function(data) {
    console.log(data);
})
sdk.deployContractSync("0x60606040523415600e57600080fd5b5b603680601c6000396000f30060606040525b600080fd00a165627a7a72305820b4c36b8b61723f302432d246407a061599017f8607ed26f1c053b5ecc63a54200029","0x3713c3d01ae09cf32787c9c66c9c0781cf4b613d", function(data) {
    console.log(data);
})
```
###### 3. getPayload(获取调用方法Payload)
```js
var abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"num1\",\"type\":\"uint32\"},{\"name\":\"num2\",\"type\":\"uint32\"}],\"name\":\"add\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"getSum\",\"outputs\":[{\"name\":\"\",\"type\":\"uint32\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"increment\",\"outputs\":[],\"payable\":false,\"type\":\"function\"}]"
var args = ["1","2"]
var func = "add"
sdk.getPayload(abi, func, args, function(data) {
    console.log(data);
})
```
###### 4. invokeContract&invokeContractSync(调用合约方法)
```js
var _const =  false;
var _from = "0x3713c3d01ae09cf32787c9c66c9c0781cf4b613d";
var _payload = "34141";
var _to = "0x8255340c2c4a1aec4010d2b6fdbb98727c65523d";

sdk.invokeContract(_const, _from, _to, _payload, function(data) {
    console.log(data);
})
sdk.invokeContractSync(_const, _from, _to, _payload, function(data) {
    console.log(data);
})
```
###### 5. maintainContract(合约维护)
```js
var _from = "0x19a170a0413096a9b18f2ca4066faa127f4d6f4a";
var _operation = 1;
var _payload = "0x60606040523415600e57600080fd5b5b603680601c6000396000f30060606040525b600080fd00a165627a7a72305820b4c36b8b61723f302432d246407a061599017f8607ed26f1c053b5ecc63a54200029";
var _to = "0xd3a7bdd391f6aa13b28a72690e19d2ab3d845ac8";

sdk.maintainContract(_from, _to, _operation, _payload, function(data) {
    console.log(data);
})
```
###### 6. queryContractStatus(查询合约状态)
```js
sdk.queryContractStatus("0xd3a7bdd391f6aa13b28a72690e19d2ab3d845ac8", function(data) {
    console.log(data);
})
```
##### Account(账户)
###### 1. createAccount(新建区块链账户)
```js
sdk.createAccount(function(data) {
    console.log(data);
})
```
