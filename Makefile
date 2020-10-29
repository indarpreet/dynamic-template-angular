.PHONY: default
default: all

dev:
	@mkdir -p config
	@codectl template . -x templates/dev.yaml --namespace cim-dev --env dev --cluster cae-np-rcdn > config/cae-np-rcdn-cim-dev-dev.yaml

all: dev 
