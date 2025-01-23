## conf 파일 수정

- 내 아이피에 맞게 IP 수정

## .csr 파일 생성

- openssl req -newkey rsa:2048 -keyout key.pem -out csr.pem -config openssl.cnf

## csr 키워드 - prom

## key.pem, cert.pem 파일 생성

- openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -config openssl.cnf -extensions v3_req

## 파일 정보 확인

- openssl x509 -in cert.pem -noout -text

# 개발서버 인증서를 브라우저에 추가

1. 개발자도구 > 보안 > 보안개요 > 인증서 > 인증서 보기 > 세부정보 > 내보내기

2. 내보낸 파일 열어서 인증서 설치 > 인증서 위치를 "신뢰할 수 있는 루트 인증 기관"으로 설정

3. 브라우저 껏다키기
