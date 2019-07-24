.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@yarn

build-cli: ## Buld the CLI
	@lerna run build-pastel --stream

build-lib: ## Buld the library
	@lerna run build-lib --stream

build: ## Buld the packages
	@lerna run build --stream

lint: ## Lint the code and check coding conventions (and automatically fix)
	@echo "Running linter..."
	@lerna run lint --stream

test: ## Run tests
	cd ./packages/polyglot-po && yarn -s test;

start: ## Run the CLI in development mode
	lerna run start