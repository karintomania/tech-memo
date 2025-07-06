# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese tech blog called "寝室コンピューティング" (Bedroom Computing) built with Hexo, a static site generator. The site is hosted on GitHub Pages and contains technical articles about programming, development tools, and software engineering topics.

## Architecture

- **Static Site Generator**: Hexo v7.3.0
- **Theme**: Landscape (default Hexo theme)
- **Deployment**: GitHub Pages via git deployment
- **Content Structure**: Markdown files in `source/_posts/` organized by year
- **Asset Management**: Post asset folders enabled (images stored alongside posts)
- **Containerization**: Docker-based development environment

## Key Commands

### Development Commands (Docker-based)
```bash
# Install dependencies
make install

# Start development server
make up

# Stop development server  
make down

# Access container shell
make shell

# Clean and regenerate site
make clean

# Create new draft post
make draft "Post Title"

# Publish draft to posts
make publish "Post Title"
```

## Content Organization

- **Posts**: Located in `source/_posts/YYYY/` directories
- **Assets**: Images and files stored in matching folders (e.g., `post-name.md` and `post-name/` folder)
- **Drafts**: Store drafts in `source/_drafts/`
- **Pages**: Static pages in `source/` (about, portfolio, projects)

## Configuration

- **Site Config**: `_config.yml` - main Hexo configuration
- **Theme Config**: `themes/landscape/_config.yml` - theme-specific settings
- **Deployment**: Configured for GitHub Pages deployment to `main` branch
- **Domain**: Custom domain `bedroomcomputing.com` via CNAME

## Development Workflow

1. Use `make up` to start the development environment
2. Create new posts with `make draft "Title"`
3. Write content in Markdown with frontmatter
4. Use `make shell` to access container for Hexo commands
5. Preview changes on localhost:5000
6. Publish drafts with `make publish "Title"`
7. Deploy with `make shell` then run deployment commands inside container

## File Structure Notes

- Posts use date-based naming: `MMDD-title.md`
- Asset folders match post names for organization
- Generated site outputs to `public/` directory
- Docker setup mounts current directory to `/app` in container