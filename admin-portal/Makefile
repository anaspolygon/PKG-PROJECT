VERSION ?= v0.0.2
REGISTRY ?= hub.polygon.local/city-onboarding
REGISTRY_UAT ?= cblhub.thecitybank.com:443/polygontech-digital-assisted-onboarding/uat
IMAGE_NAME ?= city-admin-portal
IMAGE_NAME_UAT ?= citybank-admin-portal
BUILD?= production

build-and-push-on-development: docker-build docker-push

# Build and start containers using Docker Compose
up:
	docker compose -f ../infra/local/docker-compose.yml up -d admin-portal --force-recreate

build:
	docker compose -f ../infra/local/docker-compose.yml up -d admin-portal --build

uat: docker-build-uat docker-push-uat

# Build Docker image for amd64 platform
docker-build-uat:
	docker build --platform linux/amd64 --build-arg BUILD=$(BUILD)  -f docker/Dockerfile --target production -t $(REGISTRY_UAT)/$(IMAGE_NAME_UAT):$(VERSION) .

# Push Docker image to registry
docker-push-uat:
	docker push $(REGISTRY_UAT)/$(IMAGE_NAME_UAT):$(VERSION)

# Build Docker image for amd64 platform
docker-build:
	docker build --platform linux/amd64 --build-arg BUILD=$(BUILD)  -f docker/Dockerfile --target production -t $(REGISTRY)/$(IMAGE_NAME):$(VERSION) .

# Push Docker image to registry
docker-push:
	docker push $(REGISTRY)/$(IMAGE_NAME):$(VERSION)
