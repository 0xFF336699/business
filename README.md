# business

数据校验

jsonschema/index.js

添加业务的校验文件

jsonschema/business_put.js

--------------------------------------------------

log文件配置

logs/index.js

-----------------------------------------------

mongo配置

mongo/index.js

-----------------------------------------

postgres配置。我没装mysql，所以用postgres代替了一下

postgres/index.js

------------------------------------------

接口

routes/apis.js

接口测试文件。js单元测试框架我都不熟，刚才粗看了一下，我没找到mock.js的多态返回类型的方法，所以觉得可能直接后端返回可以更加机动一些，当然这样也等于是没有完成前端独立测试的功能，这个事我回头再学习一下吧。

routes/apis.test.js