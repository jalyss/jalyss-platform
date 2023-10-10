app_name := jalyss
docker_files := --file ./infrastructure/docker-compose.yaml --file ./infrastructure/docker-compose.prod.yaml
# ecr_endpoint := 555811813125.dkr.ecr.me-south-1.amazonaws.com

MAKEFLAGS += --no-print-directory

start:
ifeq (, $(shell which yarn))
	@make prod
else
	@make up
	@yarn
	@yarn generate
	@yarn migrate:deploy
	@yarn seed
	@yarn run start
endif

deploy:
	# @make up
	@yarn
	@yarn build
	@pm2 kill
	@yarn generate
	@yarn migrate:deploy
	@yarn seed
	@pm2 start "yarn workspace back start:prod" --name api
	@pm2 start "yarn workspace server-front start:prod" --name server-front

docker:
	@docker build -t jalyss .

up:
	@docker-compose --project-name $(app_name) \
		--file ./infrastructure/docker-compose.yaml \
		--file ./infrastructure/docker-compose.dev.yaml \
		up --remove-orphans -d

stop:
	@docker container stop $$(docker container ls -q --filter name=jalyss) || true

prod:
	@make ecr-login
	@docker-compose --project-name $(app_name) $(docker_files) up --remove-orphans -d

build:
	@docker-compose --project-name $(app_name) $(docker_files) build --no-cache
  #--no-cache --progress=plain

# ecr-push:
# 	@make ecr-login
# 	@docker push $(ecr_endpoint)/jalyss-erp-app:latest

pull:
	@make ecr-login
	@docker-compose --project-name $(app_name) $(docker_files) pull

# ecr-login:
# 	@aws ecr get-login-password | docker login --username AWS --password-stdin $(ecr_endpoint)

pg-query:
	@docker-compose --project-name $(app_name) --file ./infrastructure/docker-compose.yaml exec -T postgres psql -U postgres postgres -c "$(query)"

destroy:
	@docker-compose --project-name $(app_name) $(docker_files) down -v

#cleanup:
#  @rm -f ./**/*.tsbuildinfo
