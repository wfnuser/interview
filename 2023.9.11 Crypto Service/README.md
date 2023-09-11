# 需求
```
curl https://rest.coinapi.io/v1/exchangerate/BTC/USD --header "X-CoinAPI-Key: xxxxxxxxxx"
```
这是一个数字货币汇率的第三方API，path中有一对数字货币的符号，比如现在是 BTC 的美元价格。

1. 在golang中请求这个 API，设计一个 struct，把结果存入其中，并打印出来。
2. 实现一个 http 服务器，框架不限，简化这个API功能为：返回任何一种数字货币的美元价格。URL格式自定。
3. 为了更快的响应，和节约费用，为这个 API 增加一个缓存（在内存实现就好），可以让已经请求过的结果在 10秒内不用再调用上游 API 。

完成每一步后请做一个 git 提交。

# 如何运行？

```bash
go run test.go
```
记得设置apikey

# 接口定义？

Get `/?coin=BTC` 返回对应币种BTC的美元价格
```json
{
"time": "2023-09-11T07:04:02.0000000Z",
"asset_id_base": "BTC",
"asset_id_quote": "USD",
"rate": 25827.559033992646
}
```

如果访问未定义币种 返回空
```json
{
"time": "",
"asset_id_base": "",
"asset_id_quote": "",
"rate": 0
}
```

如果出现内部错误 返回内部错误