# 1단계: Node.js로 React 애플리케이션 빌드
FROM node:18 AS build

# 앱 디렉토리 생성
WORKDIR /app

# 패키지 설치 및 의존성 복사
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드 복사 및 빌드
COPY . .

# .env.real 파일을 복사하여 .env 파일로 설정
COPY .env.real .env

# .env 파일이 복사되었는지 확인하기 위한 출력
RUN cat .env

RUN yarn build

# 2단계: Nginx로 빌드된 React 애플리케이션 서빙
FROM nginx:alpine

# Nginx 설정 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 설정 파일을 컨테이너 내부에 복사 (선택 사항)
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출 및 Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
