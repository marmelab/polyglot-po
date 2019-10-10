.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@yarn

build: ## Buld the packages
	@./node_modules/.bin/lerna run build --stream

lint: ## Lint the code and check coding conventions (and automatically fix)
	@echo "Running linter..."
	@./node_modules/.bin/lerna run lint --stream

test: ## Run tests
	yarn -s test;

start: ## Run the CLI in development mode
	./node_modules/.bin/lerna run start
