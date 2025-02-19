.PHONY: up, shell, draft, publish, deploy

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

draft:
	$(eval TITLE := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)))
	docker compose run --rm tech-memo /bin/bash -c 'hexo new draft $(TITLE)'

publish:
	$(eval TITLE := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)))
	docker compose run --rm tech-memo /bin/bash -c 'hexo publish $(TITLE)'

deploy:
	docker compose run --rm tech-memo /bin/bash -c 'hexo clean && hexo generate'
	docker compose run --rm tech-memo /bin/bash -c 'git config --global user.name karintomania && git config --global user.email 19652340+karintomania@users.noreply.github.com && hexo deploy'