#!/bin/bash

# 기본 변수 : 프로젝트 생성 시 이 부분만 수정
SERVER_DOMAIN="publish.fabtable.fnfworks.com"
SERVICE_NAME="publish-fabtable-next"
BLUE_PORT=8887
GREEN_PORT=8888

# 아래는 수정하지 않아도 됨

# 이미지 및 컨테이너 변수
SERVICE_IMAGE="${SERVICE_NAME}-docker"
BLUE_CONTAINER="${SERVICE_NAME}-blue"
GREEN_CONTAINER="${SERVICE_NAME}-green"

# 경로 설정
DOCKER_BIN="/usr/local/bin/docker"
DOCKER_COMPOSE_BIN="/usr/local/bin/docker-compose"
DEPLOY_DIR="/var/services/homes/fnfworks/docker-app/${SERVICE_IMAGE}/deploy"
NGINX_CONF_DIR="/etc/nginx/conf.d"

# 템플릿 및 출력 파일 경로
COMPOSE_TEMPLATE="${DEPLOY_DIR}/docker-compose.template.yml"
COMPOSE_FILE="${DEPLOY_DIR}/docker-compose.yml"
NGINX_TEMPLATE="${DEPLOY_DIR}/nginx.template.conf"
NGINX_CONF="${DEPLOY_DIR}/nginx.conf"
SERVICE_URL_TEMPLATE="${DEPLOY_DIR}/service-url.template.inc"
SERVICE_URL_BLUE="${DEPLOY_DIR}/service-url-blue.inc"
SERVICE_URL_GREEN="${DEPLOY_DIR}/service-url-green.inc"

# Nginx 설정 파일 심볼릭 링크
NGINX_CONF_SYMLINK="${NGINX_CONF_DIR}/http.${SERVICE_NAME}.conf"
SERVICE_URL_SYMLINK="${NGINX_CONF_DIR}/${SERVICE_NAME}-service-url.inc"

# 🔹 함수: 템플릿 파일을 생성하는 공통 함수
create_config_file() {
    local template_file="$1"
    local output_file="$2"
    shift 2  # 앞 두 개의 인수를 제거
    echo "🔄 Generating ${output_file}..."
    sed "$@" "$template_file" > "$output_file"
}

# 🔹 템플릿을 기반으로 설정 파일 생성
create_config_file "$COMPOSE_TEMPLATE" "$COMPOSE_FILE" \
    -e "s/\${SERVICE_NAME}/${SERVICE_NAME}/g" \
    -e "s/\${SERVICE_IMAGE}/${SERVICE_IMAGE}/g" \
    -e "s/\${BLUE_CONTAINER}/${BLUE_CONTAINER}/g" \
    -e "s/\${GREEN_CONTAINER}/${GREEN_CONTAINER}/g" \
    -e "s/\${BLUE_PORT}/${BLUE_PORT}/g" \
    -e "s/\${GREEN_PORT}/${GREEN_PORT}/g"

create_config_file "$NGINX_TEMPLATE" "$NGINX_CONF" \
    -e "s|\${SERVER_DOMAIN}|${SERVER_DOMAIN}|g" \
    -e "s|\${SERVICE_NAME}|${SERVICE_NAME}|g"

create_config_file "$SERVICE_URL_TEMPLATE" "$SERVICE_URL_BLUE" \
    -e "s|\${SERVICE_PORT}|${BLUE_PORT}|g"

create_config_file "$SERVICE_URL_TEMPLATE" "$SERVICE_URL_GREEN" \
    -e "s|\${SERVICE_PORT}|${GREEN_PORT}|g"

# 🔹 현재 실행 중인 서비스 확인 및 전환 대상 결정
IS_GREEN=$(${DOCKER_BIN} ps | grep ${GREEN_CONTAINER})
if [ -z "$IS_GREEN" ]; then
    CURRENT_CONTAINER=${BLUE_CONTAINER}
    NEW_CONTAINER=${GREEN_CONTAINER}
    NEW_PORT=${GREEN_PORT}
    NEW_SERVICE_FILE=${SERVICE_URL_GREEN}
else
    CURRENT_CONTAINER=${GREEN_CONTAINER}
    NEW_CONTAINER=${BLUE_CONTAINER}
    NEW_PORT=${BLUE_PORT}
    NEW_SERVICE_FILE=${SERVICE_URL_BLUE}
fi

echo "### Swapping ${CURRENT_CONTAINER} → ${NEW_CONTAINER} ###"

# 🔹 함수: 새로운 컨테이너 배포
deploy_service() {
    echo "1. Get New Image"
    sudo ${DOCKER_BIN} rmi ${SERVICE_IMAGE}:latest
    sudo ${DOCKER_BIN} load -i ${DEPLOY_DIR}/${SERVICE_IMAGE}.tar

    echo "2. Start New Container: ${NEW_CONTAINER}"
    sudo ${DOCKER_BIN} rm ${NEW_CONTAINER}
    sudo ${DOCKER_COMPOSE_BIN} -f ${COMPOSE_FILE} up -d ${NEW_CONTAINER}

    for RETRY_COUNT in {1..10}
    do
        echo "3. Health Check: ${NEW_CONTAINER}..."
        sleep 3
        REQUEST=$(curl -s http://127.0.0.1:${NEW_PORT})

        if [ -n "$REQUEST" ]; then
            echo "✅ Health Check Success: ${NEW_CONTAINER}"
            break;
        fi

        if [ ${RETRY_COUNT} -eq 10 ]; then
            echo "❌ Health Check Failed. Deployment Aborted."
            exit 1
        fi

        echo "⚠️ Health Check Failed. Retrying..."
    done
}

# 🔹 함수: Nginx 설정 및 재시작
setup_nginx() {
    echo "4. Reload Nginx"
    sudo ln -sf ${NEW_SERVICE_FILE} ${SERVICE_URL_SYMLINK}
    sudo ln -sf ${NGINX_CONF} ${NGINX_CONF_SYMLINK}
    sudo nginx -s reload
}

# 🔹 함수 실행 (컨테이너 배포 + Nginx 설정 업데이트)
deploy_service
setup_nginx

# 🔹 기존 컨테이너 중지
echo "5. Stop Old Container: ${CURRENT_CONTAINER}"
sudo ${DOCKER_COMPOSE_BIN} -f ${COMPOSE_FILE} stop ${CURRENT_CONTAINER}

echo "🎉 Deployment Completed! ${NEW_CONTAINER} is now active."
