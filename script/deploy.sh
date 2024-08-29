#!/bin/bash

IS_GREEN=$(sudo /usr/local/bin/docker ps | grep fabtable-next-green)
#IMAGE_TAG=$1
#DOCKER_USERNAME=$2

if [ -z "$IS_GREEN"  ];then # blue라면

  echo "### BLUE => GREEN ###"

  echo "1. get green image"
  sudo /usr/local/bin/docker rmi fabtable-next-docker:latest
  #docker rmi -f fabtable-next-green
  sudo /usr/local/bin/docker load -i /var/services/homes/fnfworks/docker-app/fabtable-next-docker/deploy/fabtable-next-docker.tar

  #docker-compose -f /home/ubuntu/docker/docker-compose.yml pull green # green으로 이미지를 내려받습니다.

  echo "2. green container up"
  #docker-compose -f /home/ubuntu/docker/docker-compose.yml up -d green # green 컨테이너 실행
  sudo /usr/local/bin/docker rm fabtable-next-green
  sudo /usr/local/bin/docker-compose -f /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/docker-compose.yml up -d fabtable-next-green # green 컨테이너 실행

  for RETRY_COUNT in {1..10}
  do
    echo "3. green health check..."
    sleep 3
    REQUEST=$(curl http://127.0.0.1:8886) # green으로 request

    if [ -n "$REQUEST" ]; then # 서비스 가능하면 health check 중지
      echo "health check success"
      break ;
    fi

    if [ ${RETRY_COUNT} -eq 10 ]
    then
      echo "> Health check 실패. "
      echo "> 엔진엑스에 연결하지 않고 배포를 종료합니다."
      exit 1
    fi

    echo "> Health check 연결 실패. 재시도..."

  done

  echo "4. reload nginx"
  #sudo cp /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/fabtable-next-green.inc /etc/nginx/conf.d/fabtable-next-service-url.inc
  sudo ln -sf /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/fabtable-next-green.inc /etc/nginx/conf.d/fabtable-next-service-url.inc
  sudo ln -sf /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/http.fabtable-next.conf /etc/nginx/conf.d/http.fabtable-next.conf
  sudo nginx -s reload

  echo "5. blue container down"
  sudo /usr/local/bin/docker-compose -f /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/docker-compose.yml stop fabtable-next-blue
else
  echo "### GREEN => BLUE ###"

  echo "1. get blue image"
  #docker-compose -f /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/docker-compose.yml pull fabtable-next-blue
  sudo /usr/local/bin/docker rmi fabtable-next-docker:latest
  #docker rmi -f fabtable-next-blue
  sudo /usr/local/bin/docker load -i /var/services/homes/fnfworks/docker-app/fabtable-next-docker/deploy/fabtable-next-docker.tar

  echo "2. blue container up"
  sudo /usr/local/bin/docker rm fabtable-next-blue
  sudo /usr/local/bin/docker-compose -f /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/docker-compose.yml up -d fabtable-next-blue

  for RETRY_COUNT in {1..10}
  do
    echo "3. blue health check..."
    sleep 3
    REQUEST=$(curl http://127.0.0.1:8885) # blue로 request

    if [ -n "$REQUEST" ]; then # 서비스 가능하면 health check 중지
      echo "health check success"
      break ;
    fi

    if [ ${RETRY_COUNT} -eq 10 ]
    then
      echo "> Health check 실패. "
      echo "> 엔진엑스에 연결하지 않고 배포를 종료합니다."
      exit 1
    fi

    echo "> Health check 연결 실패. 재시도..."

  done

  echo "4. reload nginx"
#  sudo cp /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/fabtable-next-blue.inc /etc/nginx/conf.d/fabtable-next-service-url.inc
  sudo ln -sf /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/fabtable-next-blue.inc /etc/nginx/conf.d/fabtable-next-service-url.inc
  sudo ln -sf /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/http.fabtable-next.conf /etc/nginx/conf.d/http.fabtable-next.conf
  #sudo cp /etc/nginx/conf.d/app/service-url-blue.inc /etc/nginx/conf.d/app/service-url.inc
  sudo nginx -s reload

  echo "5. green container down"
  #docker-compose -f /home/ubuntu/docker/docker-compose.yml stop green
  sudo /usr/local/bin/docker-compose -f /var/services/homes/fnfworks/docker-app/fabtable-next-docker/script/docker-compose.yml stop fabtable-next-green
fi
