#####增加release签名
通过openssl命令等工具生成签名文件`private.pem`、`certificate.pem`，例如：

`openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem`

在工程的sign/release目录，将私钥文件private.pem和证书文件certificate.pem拷贝进去

注意: 若未指定release签名,则使用默认的debug签名,由于debug签名是公开的，安全性无法保证，一定不要使用debug签名签发正式上线的应用