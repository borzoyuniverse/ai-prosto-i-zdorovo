install:
	pnpm install

build-test-app:
	pnpm build:test

deploy-test-app: APP_PATH = /opt/two-meter-guide/ui
deploy-test-app: USERNAME = user
deploy-test-app: HOST = two-meter-guide.lan
deploy-test-app:
	rsync -avzr --rsh=ssh dist/* $(USERNAME)@$(HOST):$(APP_PATH)

