.PHONY: up, shell, draft, publish


install: 
	docker compose run --rm tech-memo /bin/bash -c 'npm install'

up: 
	docker compose up -d

down: 
	docker compose down

shell:
	$(eval CMD := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)))
	@if  [ "$(CMD)" ]; then \
		docker compose exec tech-memo /bin/bash -c '$(CMD)'; \
	else \
		docker compose exec tech-memo /bin/bash; \
	fi

clean:
	docker compose exec tech-memo /bin/bash -c 'hexo clean && hexo generate'

draft:
	$(eval TITLE := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)))
	docker compose run --rm tech-memo /bin/bash -c 'hexo new draft $(TITLE)'

publish:
	$(eval TITLE := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)))
	docker compose run --rm tech-memo /bin/bash -c 'hexo publish $(TITLE)'