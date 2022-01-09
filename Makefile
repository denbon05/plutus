install: install-deps build

install-deps:
	npm install

build:
	npm run build

start:
	DEBUG='nuxt:*' npm run dev

start-prod:
	npm run start

fix:
	npm run lintfix

format:
	npx prettier --write --list-different .

test:
	npm test

cover:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
