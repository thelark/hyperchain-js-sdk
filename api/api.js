~ function(global, func) {
    "use strict";
    func(global);
}(typeof window !== "undefined" ? window : this, function(window) {
    "use strict";
    // VERSION
    const version = 'v0.0.1';

    // ERROR
    const ERR_NOACCESSTOKEN = new Error("Don't have access token, please get api token first.");
    const ERR_NOREFRESHTOKEN = new Error("Don't have refresh token, please get api token first.");

    const apiUrl = "https://api.hyperchain.cn/v1";

    // METHOD
    function structureBody(obj) {
        let str = '';
        for (let key in obj) {
            str += key + '=' + obj[key] + '&';
        }
        str = str.substring(0, str.length - 1)
        return str;
    }

    function doRequest(uri, method, headers, body) {
        return fetch(uri, {
            method: method,
            headers: headers,
            body: body ? body : undefined
        });
    }


    // 工厂
    var SDK = function(_factory, _phone, _password, _apiKey, _apiSecret) {
        let sdk = this;

        this.phone = config.phone;
        this.password = config.password;
        this.apiKey = config.apiKey;
        this.apiSecret = config.apiSecret;
        if (_phone) {
            this.phone = _phone;
        }
        if (_password) {
            this.password = _password;
        }
        if (_apiKey) {
            this.apiKey = _apiKey;
        }
        if (_apiSecret) {
            this.apiSecret = _apiSecret;
        }


        this.accessToken = "";
        this.refreshToken = "";
        this.version = version;

        doRequest(apiUrl + '/token/gtoken/', 'POST', {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/plain'
        }, structureBody({
            phone: sdk.phone,
            password: sdk.password,
            client_id: sdk.apiKey,
            client_secret: sdk.apiSecret
        })).then(response => response.json()).then(
            data => {
                sdk.accessToken = data.access_token;
                sdk.refreshToken = data.refresh_token;
                _factory(data);
            }
        ).then(err => {
            if (err) throw new Error(err);
        });

        function checkAccessToken() {
            return !!sdk.accessToken;
        }

        function checkRefreshToken() {
            return !!sdk.refreshToken;
        }

        this.getAccessToken = function() {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            return sdk.accessToken;
        }
        this.getRefreshToken = function() {
            if (!checkRefreshToken()) {
                throw ERR_NOREFRESHTOKEN;
            }
            return sdk.refreshToken;
        }

        this.refreshApiToken = function(callback) {
            if (!checkRefreshToken()) {
                throw ERR_NOREFRESHTOKEN;
            }
            let uri = apiUrl + '/token/rtoken/';
            let method = 'POST';
            let header = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"
            };
            let body = {
                refresh_token: sdk.refreshToken,
                client_id: sdk.apiKey,
                client_secret: sdk.apiSecret
            };
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                sdk.accessToken = data.access_token;
                sdk.refreshToken = data.refresh_token;
                callback(data);
            });
        }
        this.createAccount = function(callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/account/create';
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryBlock = function(_type, _value, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/block/query?type=' + _type + '&value=' + _value;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryBlocks = function(_index, _pageSize, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/blocks/page?index=' + _index + '&pageSize=' + _pageSize;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryBlocksByRange = function(_from, _to, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/blocks/range?from=' + _from + '&to=' + _to;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.compileContract = function(_contractCode, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/compile';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                CTCode: _contractCode,
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.deployContract = function(_bin, _from, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/deploy';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                Bin: _bin,
                From: _from
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.deployContractSync = function(_bin, _from, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/deploysync';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                Bin: _bin,
                From: _from
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.getPayload = function(_abi, _func, _args, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/payload';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                Abi: _abi,
                Args: _args,
                Func: _func
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.invokeContract = function(_const, _from, _to, _payload, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/invoke';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                Const: _const,
                From: _from,
                Payload: _payload,
                To: _to
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.invokeContractSync = function(_const, _from, _to, _payload, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/invokesync';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                Const: _const,
                From: _from,
                Payload: _payload,
                To: _to
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.maintainContract = function(_from, _to, _operation, _payload, callback) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/maintain';
            let method = 'POST';
            let header = {
                "Content-Type": "application/json",
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {
                From: _from,
                Operation: _operation,
                Payload: _payload,
                To: _to
            };
            doRequest(uri, method, header, JSON.stringify(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryContractStatus = function(_address) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/contract/status?address' + _address;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryTransactionCount = function() {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/transaction/count';
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryTransactionByHash = function(_hash) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/transaction/query?hash' + _hash;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryTransactionReceipt = function(_txhash) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/transaction/txreceipt?txhash=' + _txhash;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }
        this.queryDiscardTransaction = function(_start, _end) {
            if (!checkAccessToken()) {
                throw ERR_NOACCESSTOKEN;
            }
            let uri = apiUrl + '/dev/transactions/discard?start=' + _start + '&end=' + _end;
            let method = 'GET';
            let header = {
                "Authorization": sdk.accessToken,
                "Accept": "application/json"
            };
            let body = {};
            doRequest(uri, method, header, structureBody(body)).then(response => response.json()).then(data => {
                callback(data);
            });
        }

        return sdk;
    }

    window.SDK = SDK;
    return SDK;
});